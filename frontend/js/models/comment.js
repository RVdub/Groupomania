class ModelComment {
    
    static postComment(commentData) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/comment/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: JSON.stringify(commentData)
                })
                .then(response => {
                    console.log("response=", response.status);
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

    static async getAllComment(postId) {
        try {
            const response = await fetch(HOST + 'api/comment/getall/' + postId,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
            const data = await response.json();
            return data;
        } catch (error) { console.log("error=", error); }
    }

    static getOneComment(commentId) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/comment/getone/' + commentId,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
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

    static deleteComment(commentId) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/comment/' + commentId,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                })
                .then(response => {
                    if (response.status == 200) {
                        resolve();
                    } else { reject(response.status); }
                })
                .catch(error => { console.log("error=", error); })
        })
    }

    static update(commentId, commentData) {
        return new Promise(function (resolve, reject) {
            fetch(HOST + 'api/comment/' + commentId,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                    body: JSON.stringify(commentData)
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

