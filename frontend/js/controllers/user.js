class UserController {

    // Test état de la connexion
    stayConnected() {
        if (localStorage.getItem('token') && localStorage.getItem('userId')) {
            new ViewWall().displayNavbar();
        } else { new ViewConnect().displayNavbar(); }
    }

    signin(formData) {
        let userData = getFormData(formData);
        listMessage.innerHTML = "";
        ModelUser.signin(userData)
            .then(response => {
                localStorage.setItem("userId", response.userId);
                localStorage.setItem("token", response.token);
                localStorage.setItem("admin", response.admin);
                new ViewWall().displayNavbar();
            })
            .catch(error => {
                console.log("error=", error);
                listMessage.innerHTML = "Utilisateur existant dans la base de données";
            })
    }

    login(formData) {
        let userData = getFormData(formData);
        listMessage.innerHTML = "";
        ModelUser.login(userData)
            .then(response => {
                localStorage.setItem("userId", response.userId);
                localStorage.setItem("token", response.token);
                localStorage.setItem("admin", response.admin);
                new ViewWall().displayNavbar();
            })
            .catch(error => {
                console.log("error=", error);
                listMessage.innerHTML = "Nom d'usage ou mot de passe incorrect";
            })
    }

    disconnect() {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location.href = "./index.html";
    }

    getOneUser() {
        if (localStorage.getItem("admin") == 1) return;
        ModelUser.getOne()
            .then(response => {
                new ViewConnect().modifyAccount(response);
            })
            .catch(error => {
                console.log("error=", error);
            })
    }

    modifyUser(formData) {
        let userData = getFormData(formData);
        ModelUser.update(userData)
            .then(response => {
                new ViewWall().displayNavbar();
            })
            .catch(error => {
                console.log("error=", error);
            })
    }

    deleteUserAlert() {
        if (localStorage.getItem("admin") == 1) return;
        new ViewConnect().deleteAccount();
    }

    deleteUser() {
        ModelUser.delete()
            .then(() => {
                localStorage.clear();
                window.location.href = "./index.html";
            })
            .catch(error => {
                console.log("error=", error);
            })

    }

}


