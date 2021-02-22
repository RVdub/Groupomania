class CommentController {

    async listComments(postId){
        var response = await ModelComment.getAllComment(postId);
        console.log("response=", response);
        return response;
    }

    postComment(formData) {
        ModelComment.postComment(formData)
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

    updateComment(commentId) {
        ModelComment.update(commentId, formData)
            .then(() => {
                ModelComment.getOneComment(commentId)
                    .then(response => {
                        new ViewWall().idHtmlComment = 'commentId' + response[0].id;
                        new ViewWall().showOneComment(response[0]);
                    })
            })
            .catch(error => {
                console.log("error=", error);
            });
    }

}

