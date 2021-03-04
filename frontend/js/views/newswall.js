class ViewWall {
    constructor() {
        this.invisible;
        this.tagImg;
    }


    // Affichage <navbar>
    displayNavbar() {
        navbar.innerHTML = `
        <nav class="navbar">
            <div class="container">
                <a class="navbar-brand" href="index.html"><img src="./logos/icon-left-font-monochrome-white.svg"
                    alt="logo Groupomania" width="150"></a>
                <div><a class="btn btn-primary mr-3" onclick="new UserController().disconnect();">Déconnection</a>
                    <a class="btn btn-primary mr-2" onclick="new UserController().getOneUser();">Modifier le compte</a>
                    <a class="btn btn-outline-primary text-light" onclick="new UserController().deleteUserAlert();">Supprimer le compte</a>
                </div>
            </div>
        </nav>`;
        template.innerHTML = '';
        this.formPost();
    }

    // Formulaire nouveau post
    formPost() {
        document.querySelector("h1").textContent = "Bienvenue sur le fil d'actualité ...";
        const formPost = document.createElement('div');
        template.appendChild(formPost);
        formPost.innerHTML = `
        <div class="accordion mb-3" id="accordionPost">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingPost">
                <button id="btn-accordionPost" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePost" aria-expanded="true" aria-controls="collapsePost">
                    Saisissez ici le texte de votre post
                </button>
                </h2>
                <div id="collapsePost" class="accordion-collapse collapse" aria-labelledby="headingPost" data-bs-parent="#accordionPost">
                    <div class="accordion-body">
                        <form id="newPost">
                            <div class="input-group">
                                <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                                <textarea class="form-control" name="content" id="content" rows="8" aria-label="Avec zone de texte" required></textarea>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center input-group">
                                <input type="file" name="imageURL" id="imageURL" accept="image/*" aria-label="Télécharger une image">
                                <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
        const insertPost = document.createElement('div');
        template.appendChild(insertPost);
        insertPost.innerHTML = `<div id="insertOnePost"></div>`;
        // Envoi formulaire
        const form = document.getElementById("newPost");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            new PostController().newPost(formData);
            this.reset();
        });
        new PostController().showListPost();
    }

    // Affichage des posts et des commentaires associés
    async showListPost(post) {
        for (let row = 0; row < post.length; row++) {
            if (post[row].user_id == localStorage.getItem("userId") || localStorage.getItem("admin") == 1) {
                this.invisible = "visible";
            } else {
                this.invisible = "invisible";
            }
            if (post[row].imageURL) {
                this.tagImg = `<img class="card-img-top" src="${HOST + post[row].imageURL}" alt="photo de l'utilisateur" />`;
            } else {
                this.tagImg = '';
            }
            let date = new Date(post[row].updateAt);
            let listPost = document.createElement('div');
            template.appendChild(listPost);
            listPost.innerHTML += `
            <div class="card" id="postId${post[row].id}">
                ${this.tagImg}
                <div class="card-body">
                    <h5 class="card-title">${post[row].pseudo} a publié le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} </h5>
                    <p class="card-text">${post[row].content}</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new PostController().getOnePost(${post[row].id});">Modifier</button>
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new PostController().deletePost(${post[row].id});">Supprimer</button>
                    </div>
                </div>
                <ul class="list-group list-group-flush">`;

            // les commentaires associés
            let comment = await new CommentController().listComments(post[row].id);
            for (let line = 0; line < comment.length; line++) {
                if (comment[line].user_id == localStorage.getItem("userId") || localStorage.getItem("admin") == 1) {
                    this.invisible = "visible";
                } else {
                    this.invisible = "invisible";
                }
                let date = new Date(comment[line].updateAt);
                listPost.innerHTML += `
                <li class="list-group-item text-muted" id="commentId${comment[line].id}">
                    Commenté par ${comment[line].pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} :
                    <small class="text-muted">${comment[line].content}</small>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new CommentController().getOneComment(${comment[line].id});">Modifier</button>
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new CommentController().deleteComment(${comment[line].id});">Supprimer</button>
                    </div>
                </li>`;
                if (line === (comment.length - 1)) { listPost.innerHTML += `</ul></div>` }
            }
            this.formComment(post[row].id);
        }
    }

    // Formulaire nouveau commentaire (un seul formulaire par post)
    formComment(postId) {
        const formComment = document.createElement('div');
        template.appendChild(formComment);
        formComment.innerHTML = `
        <div class="accordion mb-3" id="accordionExample${postId}">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne${postId}">
                    <button id="btn-accordion${postId}" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne${postId}" aria-expanded="true" aria-controls="collapseOne${postId}}">
                        Saisissez ici le texte de votre commentaire
                    </button>
                </h2>
                <div id="collapseOne${postId}" class="accordion-collapse collapse" aria-labelledby="headingOne${postId}" data-bs-parent="#accordionExample${postId}">
                    <div class="accordion-body">
                    <form id="newComment${postId}">
                        <div class="input-group">
                            <textarea class="form-control" name="content" rows="4" aria-label="Avec zone de texte" required></textarea>
                            <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                            <input type="hidden" name="post_id" value="${postId}">
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>`;
        // Envoi formulaire
        const form = document.getElementById('newComment' + postId);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            new CommentController().postComment(postId, formData);
        });
    }



    // Affichage après modification ou saisie ---------------------------------------------------------------------------
    // Fenêtre modale modification d'un post
    addModal(post) {
        let postId = post.id;
        listMessage.innerHTML = `
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Modifiez le texte et/ou la photo</h5>
                    </div>
                    <div class="modal-body">
                        <form id="form4">
                            <div class="input-group">
                                <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                                <textarea class="form-control col-12" name="content" rows="8" cols="80" aria-label="Avec zone de texte">${post.content}</textarea>
                                <div class="col-12">
                                    <input type="file" name="imageURL" accept="image/*" aria-label="Télécharger une image">
                                </div>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center input-group">
                                <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;
        const myModal = new bootstrap.Modal(document.getElementById("myModal"));
        myModal.show();
        // Envoi formulaire
        const form = document.getElementById('form4');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            new PostController().updatePost(postId, formData);
            myModal.hide();
        })
    }

    // Affichage d'un nouveau post
    showOnePost(post) {
        if (post.imageURL) {
            this.tagImg = `<img class="card-img-top" src="${HOST + post.imageURL}" alt="photo de l'utilisateur">`;
        } else {
            this.tagImg = '';
        }
        let date = new Date(post.updateAt);
        insertOnePost.innerHTML += `
        <div class="card mb-3">
            ${this.tagImg}
            <div class="card-body">
                <h5 class="card-title">${post.pseudo} a publié le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} </h5>
                <p class="card-text">${post.content}</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="new PostController().getOnePost(${post.id});">Modifier</button>
                    <button type="button" class="btn btn-secondary btn-sm" onclick="new PostController().deletePost(${post.id});">Supprimer</button>
                </div>
            </div>
        </div>`;
    }

    // Affichage d'un nouveau commentaire
    showOneComment(postId, comment) {
        let date = new Date(comment.updateAt);
        document.getElementById('newComment'+ postId).outerHTML = `
            <li class="list-group-item text-muted" id="commentId${comment.id}">
                Commenté par ${comment.pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} :
                <small class="text-muted">${comment.content}</small>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="new CommentController().getOneComment(${comment.id});">Modifier</button>
                </div>
            </li>`;
        document.getElementById('btn-accordion'+ postId).textContent = `${comment.pseudo}, votre nouveau commentaire...`;
    }

    // Modification d'un commentaire
    modifyComment(comment) {
        let commentId = comment.id;
        let date = new Date(comment.updateAt);
        document.getElementById('commentId' + comment.id).outerHTML = `
        <li class="list-group-item text-muted" id="commentId${comment.id}">
            Commenté par ${comment.pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)}
            <form id="form5">
                <div class="input-group">
                    <textarea class="form-control" name="content" rows="4" aria-label="Avec zone de texte">${comment.content}</textarea>
                    <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                    <input type="hidden" name="post_id" value="${comment.post_id}">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                    </div>
                </div>
            </form>
        </li>`;
        // Envoi formulaire
        const form = document.getElementById('form5');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            new CommentController().updateComment(commentId, formData);
        })
    }

    // Affichage d'un commentaire modifié
    showModifyComment(comment) {
        let date = new Date(comment.updateAt);
        document.getElementById('commentId'+ comment.id).outerHTML = `
            <li class="list-group-item text-muted" id="commentId${comment.id}">
                Commenté par ${comment.pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} :
                <small class="text-muted">${comment.content}</small>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="new CommentController().getOneComment(${comment.id});">Modifier</button>
                </div>
            </li>`;
    }

}


