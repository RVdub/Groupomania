// Déclaration des variables
let email;
let pseudo;
let password;
let userId;
let access_token;
let invisible = "invisible";
let content;
let filename;
let oldPassword;



// DEUXIEME PAGE -------------------------------------------------------------------------------------------------------
// Affichage du fil d'actualité
function showPosts() {
    // Affichage <navbar>
    navbar.innerHTML =
        `<nav class="navbar">
        <div class="container">
            <a class="navbar-brand" href="index.html"><img src="./logos/icon-left-font-monochrome-white.svg"
                alt="logo Groupomania" width="150"></a>
            <div><a class="btn btn-primary mr-3" id="disconnect">Déconnection</a>
                <a class="btn btn-primary mr-2" id="modifyAccount">Modifier le compte</a>
                <a class="btn btn-outline-primary text-light" id="deleteAccount">Supprimer le compte</a>
            </div>
        </div>
    </nav>`;
    // Affichage page <template>
    document.querySelector("h1").textContent = "Bienvenue sur le fil d'actualité ...";
    template.innerHTML =
        `<div class="accordion" id="inputPost">
            <div class="accordion-item">
                <h2 class="accordion-header bg-secondary" id="headingInputPost">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInputPost" aria-expanded="true" aria-controls="collapseInputPost">
                    Créez votre publication</button>
                </h2>
                <div id="collapseInputPost" class="accordion-collapse collapse" aria-labelledby="headingInputPost" data-bs-parent="#inputPost">
                    <div class="accordion-body">
                        <div class="input-group">
                            <textarea class="form-control" id="content" rows="8" aria-label="Avec zone de texte"></textarea>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                            <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#Modal">Ajouter une image</button>
                            <button type="button" class="btn btn-secondary btn-sm" id="publishPost">Publier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Sélectionner une image (.png, .jpg)</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                    </div>
                    <div class="modal-body">
                        <form name="image" id="form3" enctype="multipart/form-data">
                            <div class="form-group">
                                <input type="file" class="form-control" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple />
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" class="btn btn-primary" id="publishImage">Afficher</button>
                    </div>
                </div>
            </div>
        </div>`;
    for (let i = 0; i < 5; i++) {
        template.innerHTML +=
            `<div class="accordion" id="accordionParent${i}">
                <div class="accordion-item">
                    <h2 class="accordion-header bg-secondary" id="headingPost${i}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePost${i}" aria-expanded="true" aria-controls="collapsePost${i}">
                            André a publié le 12.1.21
                        </button>
                    </h2>
                    <div id="collapsePost${i}" class="accordion-collapse collapse show" aria-labelledby="headingPost${i}" data-bs-parent="#accordionParent${i}">
                        <div class="accordion-body">
                            <strong>This is the first item\'s accordion body.</strong> It is not hidden by default.
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="button" class="btn btn-secondary btn-sm ${invisible}" id="modifyPost">Modifier</button>
                                <button type="button" class="btn btn-secondary btn-sm ${invisible}" id="deletePost">Supprimer</button>
                                <button class="btn btn-outline-info me-md-2" type="button"><i class="far fa-thumbs-up"> 0</i ></button>
                                <button class="btn btn-outline-info" type="button"><i class="far fa-thumbs-down"> 0</i ></button>
                            </div>
                        </div>
                    </div>
                </div>`;
        for (let j = 0; j < 2; j++) {
            template.innerHTML +=
                `<div class="accordion-item">
                    <h2 class="accordion-header" id="headingComment${i}_${j}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseComment${i}_${j}" aria-expanded="false" aria-controls="collapseComment${i}_${i}">
                            Hervé a commenté le 31.1.21
                        </button>
                    </h2>
                        <div id="collapseComment${i}_${j}" class="accordion-collapse collapse" aria-labelledby="headingComment${i}_${j}" data-bs-parent="#accordionParent${i}">
                            <div class="accordion-body">
                                <strong>This is the second item\'s accordion body.</strong> It is hidden by default.
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="button" class="btn btn-secondary btn-sm ${invisible}" id="modifyComment">Modifier</button>
                                    <button type="button" class="btn btn-secondary btn-sm ${invisible}" id="deleteComment">Supprimer</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>`;
        };
        template.innerHTML +=
            `<div class="accordion-item">
            <h2 class="accordion-header" id="headindInputComment${i}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInputComment${i}" aria-expanded="false" aria-controls="collapseInputComment${i}">
                    Ecrire un commentaire
                </button>
            </h2>
            <div id="collapseInputComment${i}" class="accordion-collapse collapse" aria-labelledby="headingInputComment${i}" data-bs-parent="#accordionParent${i}">
                <div class="accordion-body">
                    <div class="form-group">
                        <div class="input-group">
                            <textarea class="form-control" id="comment" aria-label="Avec zone de texte"></textarea>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button type="button" class="btn btn-secondary btn-sm" id="publishPost">Publier</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    };
    // Pagination
    let k = 1;
    template.innerHTML +=
        `<nav aria-label="Page navigation">
            <ul class="pagination justify-content-center pagination-sm">
                <li class="page-item disabled"><a class="page-link" id="previous" tabindex="-1" aria-disabled="true">Précédent</a></li>
                <li class="page-item active" aria-current="page"><span class="page-link">${k}</span></li>
                <li class="page-item"><a class="page-link" id="secondPage">${k + 1}</a></li>
                <li class="page-item"><a class="page-link" id="thirdPage">${k + 2}</a></li>
                <li class="page-item"><a class="page-link" id="next">Suivant</a></li>
            </ul>
        </nav>`;

    // Tous les boutons :
    // <Déconnexion>
    document.getElementById('disconnect').addEventListener("click", () => {
        localStorage.removeItem("access_token");
        window.location.href = "./index.html";
    });
    // <Modifier son compte>
    document.getElementById("modifyAccount").addEventListener("click", modifyAccount);
    // <Suppression de son compte>
    document.getElementById("deleteAccount").addEventListener("click", deleteAccount);
    // <publier un post>
    document.getElementById("publishPost").addEventListener("click", () => {
        content = document.getElementById("content").value;
        // contrôle du contenu
        if (content == '') return; // vérifier inputReg
        const inputReg = /(?=.*?[<>`${}])/s;
        if (inputReg.test(content)) {
            alert('Caractères intedits: < > ` $ { }');
            return;
        };
        addPost();
    });
    // la suite en stock    document.getElementById("").addEventListener("click", function() {});


}


// FONCTIONS, composants et requêtes -----------------------------------------------------------------------------------
// Suppression du compte, des posts et des commentaires en cascade
function deleteAccount() {
    document.querySelector("h1").textContent = "Attention !";
    template.innerHTML =
        `<div class="alert alert-dark alert-dismissible fade show" role="alert">
            <strong>Attention</strong>  en supprimant votre compte, vous allez perdre tous vos posts, vos commentaires et vos likes/dislikes. Etes-vous sûr(e) ?
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-danger btn-sm me-md-2" id="yesButton" type="button">Oui</button>
                <button class="btn btn-success btn-sm" id="noButton" type="button">Non</button>
            </div>
        </div>`;
    document.getElementById("noButton").addEventListener("click", showPosts);
    document.getElementById("yesButton").addEventListener("click", disableApi);
}
// Requête
function disableApi() {
    let userId = localStorage.getItem("userId");
    let access_token = localStorage.getItem("access_token");
    fetch("http://localhost:3000/api/disable",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify({ "userId": userId }),
        })
        .then(response => response.json())
        .then(() => {
            localStorage.clear();
            window.location.href = "./index.html";
        })
        .catch(error => alert("Une erreur est survenue: " + error.message))
}

// Modification du compte
function modifyAccount() {
    let userId = localStorage.getItem("userId");
    let access_token = localStorage.getItem("access_token");
    fetch("http://localhost:3000/api/" + userId,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache"
        })
        .then(response => response.json())
        .then((responseJson) => {
            document.querySelector("h1").textContent = "Modifier votre compte";
            oldPassword = responseJson[0].password;
            template.innerHTML =
                `<form name="signup" id="form3">
                <div class="form-group">
                  <label for="email">Votre adresse électronique :</label>
                  <input type="email" pattern="${emailReg}" value="${responseJson[0].email}" class="form-control" name="email" id="email" required />
                </div>
                <div class="form-group">
                  <label for="username">Votre nom d\'usage :</label>
                  <input type="text" pattern="${usernameReg}" value="${responseJson[0].pseudo}" class="form-control" name="username" id="username" required />
                </div>
                <div class="form-group">
                  <label for="inputPassword1">Mot de passe mini 8 cara. dont 1 Maj, 1 chiffre et 1 cara. spécial :</label>
                  <input type="password" pattern="${passwordReg}" class="form-control" id="inputPassword2" value="${oldPassword}" required>
                </div>
                <p></p>
                <button type="submit" class="btn btn-primary">Modifier</button>
              </form>`;

        })
        .then(() => { // Envoi formulaire
            document.getElementById("form3").addEventListener("submit", function (event) {
                event.preventDefault();
                email = document.forms["signup"].elements["email"].value;
                pseudo = document.forms["signup"].elements["username"].value;
                password = document.forms["signup"].elements["inputPassword2"].value;
                modifyAccountAPI();
            });
        })
        .catch(error => alert("Une erreur est survenue: " + error.message))
}
// Requête
function modifyAccountAPI() {
    let userId = localStorage.getItem("userId");
    let access_token = localStorage.getItem("access_token");
    fetch("http://localhost:3000/api/modifyAccount",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            credentials: "include",
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify({
                "userId": userId,
                "oldPassword": oldPassword,
                "email": email,
                "pseudo": pseudo,
                "password": password
            }),
        })
        .then(response => response.json())
        .then(() => {
            if (!responseJson.userId || !responseJson.pseudo || !responseJson.password) {
                template.innerHTML += `<p class="text-danger">Le serveur dit: ${responseJson.error} ${responseJson.message}</p>`
            } else {
                showPosts();
            }
        })
        .catch(error => alert("Une erreur est survenue: " + error.message))
}

// Publication d'un Post
// Envoi à l'API du contact et du tableau de produits
function addPost() {
    let userId = localStorage.getItem("userId");
    let access_token = localStorage.getItem("access_token");
    fetch("http://localhost:3000/api/post",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "content": content,
                "filename": filename,
            }),
        })
        .then(response => response.json())
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            console.log(response.json());
        })
        .then((response) => {
            console.log(response);//affichage de vérification
            console.log(response.type);
            console.log(response.url);
            console.log(response.useFinalURL);
            console.log(response.status);
            console.log(response.ok);
            console.log(response.statusText);
            console.log(response.headers);
        })
        .catch(error => alert("Une erreur est survenue: " + error.message))
}











