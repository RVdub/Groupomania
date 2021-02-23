class ModelPost {

    static newPost(formData) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/post/',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: formData
                })
                .then(response => {
                    if (response.status == 200) {
                        response.json()
                            .then(insertId => {
                                resolve(insertId);
                            })
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }

    static getAllPost() {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/post/',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
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

    static getOnePost(postId) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/post/' + postId,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                })
                .then(response => {
                    if (response.status == 200) {
                        response.json()
                            .then(data => {
                                console.log("body=", data);
                                resolve(data[0]);
                            })
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }

    static deletePost(postId) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/post/' + postId,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })
                .then(response => {
                    if (response.status == 200) { resolve();
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }

    static update(postId, formData) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/post/' + postId,
                {
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: formData,
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

