class CommentController {

    async listComments(postId) {
        try {
            const response = await ModelComment.getAllComment(postId);
            console.log("response=", response);
            return response;
        } catch (error) { console.log("error=", error); }
    }

    postComment(formData) {
        let commentData = getFormData(formData);
        console.log(commentData);
        ModelComment.postComment(commentData)
            .then(response => {
                ModelComment.getOneComment(response.insertId)
                    .then(response => {
                        new ViewWall().showOneComment(response[0]);
                    })
            })
            .catch(error => {
                console.log("error=", error);
            });
    }

    deleteComment(commentId) {
        ModelComment.deleteComment(commentId)
            .then(() => {
                document.getElementById("commentId" + commentId).remove();
            })
            .catch(error => {
                console.log("error=", error);
            });
    }

    getOneComment(commentId) {
        ModelComment.getOneComment(commentId)
            .then(response => {
                new ViewWall().modifyComment(response[0]);
            })
            .catch(error => {
                console.log("error=", error);
            });
    }

    updateComment(commentId, formData) {
        let commentData = getFormData(formData);
        console.log(commentData);
        ModelComment.update(commentId, commentData)
            .then(() => {
                ModelComment.getOneComment(commentId)
                    .then(response => {
                        new ViewWall().idHtmlComment = "commentId" + response[0].id;
                        new ViewWall().showOneComment(response[0]);
                    })
            })
            .catch(error => {
                console.log("error=", error);
            });
    }

}

