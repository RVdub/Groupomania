class ModelUser {
    
    static signin(userData) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/user/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => {
                    if (response.status == 201) {
                        response.json()
                            .then(data => {
                                resolve(data);
                            })
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }

    static login(userData) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/user/login/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                .then(response => {
                    if (response.status == 201) {
                        response.json()
                            .then(data => {
                                resolve(data);
                            })
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }

    static delete() {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/user/' + localStorage.getItem("userId"),
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })
                .then(response => {
                    if (response.status == 200) {
                        response.json()
                            .then(data => {
                                resolve(data);
                            })
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }

    static getOne() {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/user/' + localStorage.getItem("userId"),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })
                .then(response => {
                    if (response.status == 201) {
                        response.json()
                            .then(data => {
                                resolve(data);
                            })
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }

    static update(userData) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/user/' + localStorage.getItem("userId"),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: JSON.stringify(userData),
                })
                .then(response => {
                    if (response.status == 201) {
                        response.json()
                            .then(data => {
                                resolve(data);
                            })
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }


}

