const sql = require('../config/db.config');

// constructor
const Post = function (post) {
  this.user_id = post.user_id;
  this.content = post.content;
  this.imageURL = post.imageURL;
  this.createdAt;
  this.updateAt;
};

Post.create = (post, result) => {
  sql.query("INSERT INTO post SET ?, createdAt = now(), updateAt = now()", post, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Post: ", res.insertId);
    result(null, res.insertId);
  });
};

Post.getAll = (offset, result) => {
  sql.query(`SELECT post.id, user.pseudo, user.id AS userId, DATE_FORMAT(post.updateAt, 'le %e %m %y') AS date, post.content
  FROM post
  INNER JOIN user ON user.id = post.user_id
  ORDER BY post.updateAt DESC LIMIT 5 OFFSET ${offset};
  SELECT comment.post_id AS id, user.pseudo, user.id AS userId, DATE_FORMAT(comment.updateAt, 'le %e %m %y') AS date, comment.content
  FROM comment
  INNER JOIN user ON user.id = comment.user_id
  WHERE EXISTS (SELECT * FROM post ORDER BY post.updateAt DESC LIMIT 5 OFFSET ${offset})
  ORDER BY comment.updateAt DESC`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
};

Post.updateById = (id, post, result) => {
  sql.query(
    "UPDATE post SET content = ?, imageURL = ?, updateAt = ? WHERE id = ?",
    [post.content, post.imageURL, post.updateAt, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {  // not found Post with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated Post: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

Post.remove = (id, result) => {
  sql.query("DELETE FROM post WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {  // not found Post with the id   
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Post with id: ", id);
    result(null, res);
  });
};


module.exports = Post;
