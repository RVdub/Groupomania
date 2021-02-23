class ViewWall {
    constructor() {
        this.invisible = 'invisible';
        this.idHtmlComment = '';
        this.tagImg = '';
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
        this.formPost();
    }

    // Formulaire nouveau post
    formPost() {
        document.querySelector("h1").textContent = "Bienvenue sur le fil d'actualité ...";
        template.innerHTML = `
        <div class="card mb-3">
            <div class="card-body">
                <form id="newPost">
                    <div class="input-group">
                        <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                        <textarea class="form-control" placeholder="Saisissez ici le texte de votre post" name="content" id="content" rows="8" aria-label="Avec zone de texte" required></textarea>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center input-group">
                        <input type="file" name="imageURL" id="imageURL" accept="image/*" aria-label="Télécharger une image">
                        <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                    </div>
                </form>    
            </div>
        </div>
        <div id="insertOnePost"></div>`;
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
        for (let postNum = 0; postNum < post.length; postNum++) {
            if (post[postNum].user_id == localStorage.getItem("userId") || localStorage.getItem("admin") == 1) {
                this.invisible = "visible";
            } else {
                this.invisible = "invisible";
            }
            if (post[postNum].imageURL) {
                this.tagImg = `<img class="card-img-top" src="${HOST + post[postNum].imageURL}" alt="photo de l'utilisateur" />`;
            } else {
                this.tagImg = '';
            }
            let date = new Date(post[postNum].updateAt);
            template.innerHTML += `
            <div class="card mb-3" id="postId${post[postNum].id}">
                ${this.tagImg}
                <div class="card-body">
                    <h5 class="card-title">${post[postNum].pseudo} a publié le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} </h5>
                    <p class="card-text">${post[postNum].content}</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new PostController().getOnePost(${post[postNum].id});">Modifier</button>
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new PostController().deletePost(${post[postNum].id});">Supprimer</button>
                    </div>
                </div>
                <ul class="list-group list-group-flush">`;
            // les commentaires associés
            let comment = await new CommentController().listComments(post[postNum].id);
            for (let commentNum = 0; commentNum < comment.length; commentNum++) {
                if (comment[commentNum].user_id == localStorage.getItem("userId") || localStorage.getItem("admin") == 1) {
                    this.invisible = "visible";
                } else {
                    this.invisible = "invisible";
                }
                let date = new Date(comment[commentNum].updateAt);
                template.innerHTML += `
                <li class="list-group-item text-muted" id="commentId${comment[commentNum].id}">
                    Commenté par ${comment[commentNum].pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} :
                    <small class="text-muted">${comment[commentNum].content}</small>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new CommentController().getOneComment(${comment[commentNum].id});">Modifier</button>
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new CommentController().deleteComment(${comment[commentNum].id});">Supprimer</button>
                    </div>
                </li>`;
            }
            // Formulaire nouveau commentaire (un seul formulaire par post)
            template.innerHTML += `
                <li class="list-group-item text-muted mb-3">
                    <form class="input-group" id="newComment${postNum}">
                        <textarea class="form-control" placeholder="Saisissez ici le texte de votre commentaire" name="content" rows="2" aria-label="Avec zone de texte" required></textarea>
                        <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                        <input type="hidden" name="post_id" value="${post[postNum].id}">
                    </form>    
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                    </div>
                </li>
                </ul>
            </div>`;
            // Envoi formulaire
            const form = document.getElementById('newComment'+ postNum);
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                this.idHtmlComment = 'newComment'+ postNum;
                const formData = new FormData(this);
                new CommentController().postComment(formData);
            });
        }
    }

    // Fenêtre modale modification d'un post
    addModal(post) {
        let postId = post.id;
        template.innerHTML += `
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Modifiez le texte et/ou la photo</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Fermer">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                        <form id="form4">
                            <div class="input-group">
                                <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                                <textarea class="form-control" name="content" rows="8" aria-label="Avec zone de texte">${post.content}</textarea>
                                <input type="file" name="imageURL" accept="image/*" aria-label="Télécharger une image">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>`;
        $('#myModal').modal('show');
        // Envoi formulaire
        const form = document.getElementById("form4");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            new PostController().updatePost(postId, formData);
            $('#myModal').modal('hide');
        })
    }

    // Affichage d'un post après publication
    showOnePost(post) {
        console.log(post);
        if (post.imageURL) {
            this.tagImg = `<img class="card-img-top" src="${HOST + post.imageURL}" alt="photo de l'utilisateur">`;
        } else {
            this.tagImg = '';
        }
        let date = new Date(post.updateAt); console.log(this.tagImg);
        insertOnePost.innerHTML += `
        <div class="card mb-3">
            ${this.tagImg}
            <div class="card-body">
                <h5 class="card-title">${post.pseudo} a publié le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} </h5>
                <p class="card-text">${post.content}</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="new PostController().modifyPost(${post.id});">Modifier</button>
                    <button type="button" class="btn btn-secondary btn-sm" onclick="new PostController().deletePost(${post.id});">Supprimer</button>
                </div>
            </div>
        </div>`;
    }

    // Affichage d'un seul commentaire
    showOneComment(comment) {
        let date = new Date(comment.updateAt);
        document.getElementsById(this.idHtmlComment).outerHTML = `
        <div id="commentId${comment.id}">
            <h5 class="card-title text-muted">Commenté par ${comment.pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} </h5>
            <p class="card-text"><small class="text-muted">${comment.content}</small></p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-secondary btn-sm" onclick="new CommentController().modifyComment(${comment.id});">Modifier</button>
                <button type="button" class="btn btn-secondary btn-sm" onclick="new CommentController().deleteComment(${comment.id});">Supprimer</button>
            </div>
        </div>`;
    }

    // Modification d'un commentaire
    modifyComment(comment) {
        let commentId = comment.id;
        let date = new Date(comment.updateAt);
        document.getElementById('commentId'+ comment.id).outerHTML = `
        <div id="commentId${comment.id}">
            <h5 class="card-title text-muted">Commenté par ${comment.pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} </h5>
            <form class="input-group" id="form5">
                <textarea class="form-control" name="content" rows="3" aria-label="Avec zone de texte">${comment.content}</textarea>
                <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                <input type="hidden" name="post_id" value="${comment.post_id}">
            </form>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
            </div>
        </div>`;
        // Envoi formulaire
        const form = document.getElementById("form5");
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            new CommentController().updateComment(commentId, formData);
        })
    }

}


