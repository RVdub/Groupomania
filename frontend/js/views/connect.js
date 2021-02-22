class ViewConnect {
    constructor() {
        this.emailReg = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}";
        this.usernameReg = "[0-9A-Za-zàâçèéêëîïôùûüÿ\', \-\/\.]+";
        this.passwordReg = "(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}";
        this.oldPassword;
    }

    // Affichage menu commun
    displayNavbar() {
        navbar.innerHTML =
            `<nav class="navbar">
                <div class="container">
                    <a class="navbar-brand" href="index.html"><img src="./logos/icon-left-font-monochrome-white.svg"
                        alt="logo Groupomania" width="150"></a>
                    <div><a class="btn btn-outline-primary mr-2 text-light" id="login">S'identifier</a>
                        <a class="btn btn-primary" id="signup">S'inscrire</a>
                    </div>
                </div>
            </nav>`;
        // boutons sur écoute
        document.getElementById("login").addEventListener("click", () => {
            this.formLogin();
        });
        document.getElementById("signup").addEventListener("click", () => {
            this.formSignup();
        });
        if (localStorage.getItem('userId')) {
            this.formLogin();
        } else { this.formSignup() }

    }

    // Inscription
    formSignup() {
        document.querySelector("h1").textContent = "Bienvenue parmi nous !";
        template.innerHTML =
            `<form name="signup" id="form1">
                <div class="form-group">
                    <label for="email">Votre adresse électronique :</label>
                    <input type="email" pattern="${this.emailReg}" placeholder="courriel@mail.fr (format attendu)" class="form-control" name="email" id="email" required />
                </div>
                <div class="form-group">
                    <label for="pseudo">Votre nom d\'usage :</label>
                    <input type="text" pattern="${this.usernameReg}" placeholder="En toutes lettres et/ou chiffres" class="form-control" name="pseudo" id="pseudo" required />
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe mini 8 cara. dont 1 Maj, 1 chiffre et 1 cara. spécial :</label>
                    <input type="password" pattern="${this.passwordReg}" class="form-control" id="password" name="password" placeholder="A bien noter ;)" required>
                </div>
                <p></p>
                <button type="submit" class="btn btn-primary">Inscription</button>
            </form>`;
        // Envoi formulaire
        document.getElementById("form1").addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(document.getElementById('form1'));
            new UserController().signin(formData);
        })
    }

    // Identification
    formLogin() {
        document.querySelector("h1").textContent = "Content de vous revoir !";
        template.innerHTML =
            `<form name="login" id="form2">
                <div class="form-group">
                    <label for="pseudo">Votre nom d\'usage :</label>
                    <input type="text" pattern="${this.usernameReg}" placeholder="Celui défini à l\'inscription" class="form-control" name="pseudo" id="pseudo" required />
                </div>
                <div class="form-group">
                    <label for="password">Votre mot de passe :</label>
                    <input type="password" pattern="${this.passwordReg}" class="form-control" name="password" id="password" placeholder="Vous en souvenez-vous ;)" required>
                </div>
                <p></p>
                <button type="submit" class="btn btn-primary">Connexion</button>
            </form>`;
        // Envoi formulaire
        document.getElementById("form2").addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(document.getElementById('form2'));
            new UserController().login(formData);
        })
    }

    // Suppression du compte => demande de confirmation
    deleteAccount() {
        document.querySelector("h1").textContent = "Attention !";
        template.innerHTML = `
            <div class="alert alert-dark alert-dismissible fade show" role="alert">
                <strong>Attention</strong>  en supprimant votre compte, vous allez perdre tous vos posts et tous vos commentaires. Etes-vous sûr(e) ?
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-danger btn-sm me-md-2" id="yesButton" type="button">Oui</button>
                    <button class="btn btn-success btn-sm" id="noButton" type="button">Non</button>
                </div>
            </div>`;
        document.getElementById("noButton").addEventListener("click", () => {
            window.location.href = "./index.html";
        });
        document.getElementById("yesButton").addEventListener("click", () => {
            new UserController().deleteUser();
        });
    }

    // Modification du compte
    modifyAccount(user) {
        document.querySelector("h1").textContent = "Modifier votre compte";
        this.oldPassword = user.password;
        template.innerHTML = `
            <form name="modify_account" id="form3">
                <div class="form-group">
                    <label for="email">Votre adresse électronique :</label>
                    <input type="email" pattern="${this.emailReg}" value="${user.email}" class="form-control" name="email" id="email" required />
                </div>
                <div class="form-group">
                  <label for="pseudo">Votre nom d\'usage :</label>
                  <input type="text" pattern="${this.usernameReg}" value="${user.pseudo}" class="form-control" name="pseudo" id="pseudo" required />
                </div>
                <div class="form-group">
                  <label for="password">Mot de passe mini 8 cara. dont 1 Maj, 1 chiffre et 1 cara. spécial :</label>
                  <input type="password" pattern="${this.passwordReg}" class="form-control" name="password" id="password" value="${user.password}" required>
                  <input type="hidden" name="oldPassword" value="${this.oldPassword}">
                </div>
                <p></p>
                <button type="submit" class="btn btn-primary">Modifier</button>
              </form>`;
        // Envoi formulaire
        document.getElementById("form3").addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(document.getElementById("form3"));
            new UserController().modifyUser(formData);
        })
    }

}

