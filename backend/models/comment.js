const sql = require('../config/db.config');

// constructor
const Comment = function(comment) {
  this.post_id = comment.post_id;
  this.user_id = comment.user_id;
  this.content = comment.content;
  this.createdAt = user.createdAt;
  this.updateAt = user.updateAt;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

Comment.updateById = (id, comment, result) => {
  sql.query(
    "UPDATE comment SET content = ?, update = ? WHERE id = ?",
    [comment.content, comment.update, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) { // not found Comment with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};

Comment.remove = (id, result) => {
  sql.query("DELETE FROM comment WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {  // not found Comment with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted comment with id: ", id);
    result(null, res);
  });
};


module.exports = Comment;
