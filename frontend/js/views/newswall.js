class ViewWall {
    constructor() {
        this.invisible = 'invisible';
        this.idHtmlComment = '';
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
            <form id="newPost">
            <div class="card-body">
                <div class="input-group">
                    <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                    <textarea class="form-control" placeholder="Saisissez ici le texte de votre post" name="content" id="content" rows="8" aria-label="Avec zone de texte" required></textarea>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <input type="file" name="imageURL" id="imageURL" accept="image/*" aria-label="Télécharger une image">
                    <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                </div>
            </div>
            </form>
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
        for (let i = 0; i < post.length; i++) {
            if (post[i].user_id == localStorage.getItem("userId") || localStorage.getItem("admin") == 1) {
                this.invisible = "visible";
            } else {
                this.invisible = "invisible";
            }
            let date = new Date(post[i].updateAt);
            template.innerHTML += `
            <div class="card mb-3" id="postId${post[i].id}">
                <img class="card-img-top" src="${HOST + post[i].imageURL}" alt="">
                <div class="card-body">
                    <h5 class="card-title">${post[i].pseudo} a publié le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} </h5>
                    <p class="card-text">${post[i].content}</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new PostController().getOnePost(${post[i].id});">Modifier</button>
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new PostController().deletePost(${post[i].id});">Supprimer</button>
                    </div>
                </div>`;
            let comment = await new CommentController().listComments(post[i].id);
            for (let j = 0; j < comment.length; j++) {
                if (comment[j].user_id == localStorage.getItem("userId") || localStorage.getItem("admin") == 1) {
                    this.invisible = "visible";
                } else {
                    this.invisible = "invisible";
                }
                let date = new Date(comment[j].updateAt);
                template.innerHTML += `
                <ul class="list-group list-group-flush">
                    <li class="list-group-item text-muted" id="commentId${comment[j].id}">
                    Commenté par ${comment[j].pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} :
                    <small class="text-muted">${comment[j].content}</small>
                    </li>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new CommentController().getOneComment(${comment[j].id});">Modifier</button>
                        <button type="button" class="btn btn-secondary btn-sm ${this.invisible}" onclick="new CommentController().deleteComment(${comment[j].id});">Supprimer</button>
                    </div>`;
            }
            // Formulaire nouveau commentaire
            template.innerHTML += `
                </ul>
                <div class="card mb-3">
                    <form class="input-group" id="newComment${i}">
                        <textarea class="form-control" placeholder="Saisissez ici le texte de votre commentaire" name="content" rows="2" aria-label="Avec zone de texte" required></textarea>
                        <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                        <input type="hidden" name="post_id" value="${post[i].id}">
                    </form>    
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
                    </div>
                </div>
            </div>`;
            // Envoi formulaire
            const form = document.getElementById("newComment${i}");
            this.idHtmlComment = `newComment${i}`;
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                const formData = new FormData(this);
                new CommentController().newPost(formData);
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
                        <form name="modify_post" id="form4">
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
        document.getElementById("form4").addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(document.getElementById('form4'));
            new PostController().updatePost(postId, formData);
            $('#myModal').modal('hide');
        })
    }

    // Affichage d'un seul post
    showOnePost(post) {
        let date = new Date(post.updateAt);
        document.getElementById('insertOnePost').outerHTML = `
        <div class="card mb-3">
            <img class="card-img-top" src="${HOST + post.imageURL}" alt="">
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
        document.getElementById(`commentId${comment.id}`).outerHTML += `
        <div id="commentId${comment.id}">
            <h5 class="card-title text-muted">Commenté par ${comment.pseudo} le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(date)} </h5>
            <form class="input-group" name="modify_post" id="form5">
                <textarea class="form-control" name="content" rows="3" aria-label="Avec zone de texte">${comment.content}</textarea>
                <input type="hidden" name="user_id" value="${localStorage.getItem('userId')}">
                <input type="hidden" name="post_id" value="${post.id}">
           </form>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-secondary btn-sm">Publier</button>
            </div>
        </div>`;
        // Envoi formulaire
        document.getElementById("form5").addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(document.getElementById('form5'));
            new CommentController().updateComment(commentId, formData);
        })
    }

}


