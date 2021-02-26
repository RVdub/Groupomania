class PostController {

    newPost(formData) {
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
                new ViewWall().showListPost(response);
            })
            .catch(error => {
                console.log("error=", error);
            });

    }

    deletePost(postId) {
        ModelPost.deletePost(postId)
            .then(() => {
                document.getElementById('postId' + postId).remove();
                document.getElementById('accordionExample' + postId).remove();
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
                window.location.href = "./index.html";
            })
            .catch(error => {
                console.log("error=", error);
            });      
    }
    
}

