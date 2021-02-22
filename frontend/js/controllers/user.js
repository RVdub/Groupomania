const HOST = "http://127.0.0.1:3000/";


class UserController {

    // Test état de la connexion
    stayConnected() {
        if (localStorage.getItem('token') && localStorage.getItem('userId')) {
            new ViewWall().displayNavbar();
        } else { new ViewConnect().displayNavbar(); }
    }

    getFormData(formData) {
        var objectData = {};
        formData.forEach(function (value, key) {
            objectData[key] = value;
        });
        return(objectData);
    }

    signin(formData) {
        let userData = this.getFormData(formData);
        listMessage.innerHTML = "";
        console.log("userData=", userData);
        ModelUser.signin(userData)
            .then(response => {
                console.log("response=", response);
                localStorage.setItem("userId", response.userId);
                localStorage.setItem("token", response.token);
                new ViewWall().displayNavbar();
            })
            .catch(error => {
                console.log("error=", error);
                listMessage.innerHTML = "Utilisateur existant dans la base de données";
            })
    }

    login(formData) {
        let userData = this.getFormData(formData);
        listMessage.innerHTML = "";
        ModelUser.login(userData)
            .then(response => {
                console.log("response=", response);
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
                console.log("response=", response);
                new ViewConnect().modifyAccount(response);
            })
            .catch(error => {
                console.log("error=", error);
            })
    }

    modifyUser(formData) {
        let userData = this.getFormData(formData);
        ModelUser.update(userData)
            .then(response => {
                console.log("response=", response);
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


