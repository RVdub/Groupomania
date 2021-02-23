class PostController {

    newPost(formData) {
        let postData = getFormData(formData);
        console.log("Data=", postData);
        ModelPost.newPost(formData)
            .then(response => {
                ModelPost.getOnePost(response.insertId)
                    .then(response => {
                        new ViewWall().showOnePost(response);
                    })
            })
            .catch(error => {
                console.log("error=", error);
            });
    }

    showListPost() {
        ModelPost.getAllPost()
            .then(response => {
                console.log(response);
                new ViewWall().showListPost(response);
            })
            .catch(error => {
                console.log("error=", error);
            });

    }

    deletePost(postId) {
        ModelPost.deletePost(postId)
            .then(() => {
                document.getElementById("postId" + postId).remove();
            })
    }

    getOnePost(postId) {
        ModelPost.getOnePost(postId)
            .then(post => {
                new ViewWall().addModal(post);            
            })
            .catch(error => {
                console.log("error=", error);
            });      
    }

    updatePost(postId, formData) {
        ModelPost.update(postId, formData)
            .then(() => {
                new ViewWall().displayNavbar();    
            })
            .catch(error => {
                console.log("error=", error);
            });      
    }

}

