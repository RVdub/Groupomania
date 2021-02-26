class CommentController {

    async listComments(postId) {
        try {
            const response = await ModelComment.getAllComment(postId);
            return response;
        } catch (error) { console.log("error=", error); }
    }

    postComment(postId, formData) {
        let commentData = getFormData(formData);
        ModelComment.postComment(commentData)
            .then(response => {
                ModelComment.getOneComment(response.insertId)
                    .then(response => {
                        new ViewWall().showOneComment(postId, response[0]);
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
        ModelComment.update(commentId, commentData)
            .then(() => {
                ModelComment.getOneComment(commentId)
                    .then(response => {
                        new ViewWall().showModifyComment(response[0]);
                    })
            })
            .catch(error => {
                console.log("error=", error);
            });
    }

}

