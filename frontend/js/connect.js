// Déclaration des variables
const emailReg = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}";
const usernameReg = "[0-9A-Za-zàâçèéêëîïôùûüÿ\', \-\/\.]+";
const passwordReg = "(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}";





stayConnected();

// Test état de la connexion
function stayConnected() {
  if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    getAllPost(0);
  } else if (localStorage.getItem('userId')) {
    logIn();
  } else { signUp(); }
}

// PREMIERE PAGE -------------------------------------------------------------------------------------------------------
// Inscription
function signUp() {
  // Affichage <navbar>
  displayNavbar();
  // Affichage page <template>
  document.querySelector("h1").textContent = "Bienvenue parmi nous !";
  template.innerHTML = 
   `<form name="signup" id="form1">
      <div class="form-group">
        <label for="email">Votre adresse électronique :</label>
        <input type="email" pattern="${emailReg}" placeholder="courriel@mail.fr (format attendu)" class="form-control" name="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="username">Votre nom d\'usage :</label>
        <input type="text" pattern="${usernameReg}" placeholder="En toutes lettres et/ou chiffres" class="form-control" name="username" id="username" required />
      </div>
      <div class="form-group">
        <label for="inputPassword1">Mot de passe mini 8 cara. dont 1 Maj, 1 chiffre et 1 cara. spécial :</label>
        <input type="password" pattern="${passwordReg}" class="form-control" id="inputPassword1" placeholder="A bien noter ;)" required>
      </div>
      <p></p>
      <button type="submit" class="btn btn-primary">Inscription</button>
    </form>`;
  // Envoi formulaire
  document.getElementById("form1").addEventListener("submit", function (event) {
    event.preventDefault();
    email = document.forms["signup"].elements["email"].value;
    pseudo = document.forms["signup"].elements["username"].value;
    password = document.forms["signup"].elements["inputPassword1"].value;
    signupApi();
  })
}

// Identification
function logIn() {
  // Affichage <navbar>
  displayNavbar();
  // Affichage page <template>
  document.querySelector("h1").textContent = "Content de vous revoir !";
  template.innerHTML = 
    `<form name="identify" id="form2">
      <div class="form-group">
        <label for="username">Votre nom d\'usage :</label>
        <input type="text" pattern="${usernameReg}" placeholder="Celui défini à l\'inscription" class="form-control" name="username" id="username" required />
      </div>
      <div class="form-group">
        <label for="inputPassword2">Votre mot de passe :</label>
        <input type="password" pattern="${passwordReg}" class="form-control" id="inputPassword2" placeholder="Vous en souvenez-vous ;)" required>
      </div>
      <p></p>
      <button type="submit" class="btn btn-primary">Connexion</button>
    </form>`;
  // Envoi formulaire
  document.getElementById("form2").addEventListener("submit", function (event) {
    event.preventDefault();
    pseudo = document.forms["identify"].elements["username"].value;
    password = document.forms["identify"].elements["inputPassword2"].value;
    loginApi();
  })
}

// Affichage menu commun
function displayNavbar() {
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
  document.getElementById("signup").addEventListener("click", signUp);
  document.getElementById("login").addEventListener("click", logIn);
  return;
}


// FONCTIONS, composants et requêtes -----------------------------------------------------------------------------------
// Envoi à l'API du nouveau contact
function signupApi() {
  fetch("http://localhost:3000/api/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "pseudo": pseudo,
        "password": password
      }),
    })
    .then(response => response.json())
    .then((responseJson) => {
      let userId = responseJson.userId;
      let token = responseJson.token;
      console.log('userId= ', userId, 'token', token); // affichage d vérification provisoire
      if (!userId) {
        template.innerHTML = `<p class="text-danger">Le serveur dit: ${responseJson.message}</p>`;
        return;
      };
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);
      getAllPost(0);
    })
    .catch(error => alert("Une erreur est survenue: " + error.message))
}

// Identification du contact avec l'API
function loginApi() {
  fetch("http://localhost:3000/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "pseudo": pseudo,
        "password": password
      }),
    })
    .then(response => response.json())
    .then((responseJson) => {
      let userId = responseJson.userId;
      let admin = responseJson.admin;
      let token = responseJson.token;
      console.log('userID ', userId, 'admin=', admin, 'token ', token); // affichage provisoire
      if (!userId) {
        template.innerHTML = `<p class="text-danger">Erreur de saisie: ${responseJson.message} ${responseJson.error}</p>`;
        return;
      };
      localStorage.setItem("userId", userId);
      localStorage.setItem("admin", admin);
      localStorage.setItem("token", token);
    })
    .then(() => getAllPost(0))
    .catch(error => alert("Une erreur est survenue: " + error.message))
}


