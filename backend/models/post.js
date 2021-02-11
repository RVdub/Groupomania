const sql = require('../config/db.config');

// constructor
const Post = function (post) {
  this.user_id = post.user_id;
  this.content = post.content;
  this.imageURL;
  this.createdAt;
  this.updateAt;
};

Post.create = (newPost, result) => {
  sql.query("INSERT INTO post SET ?, createdAt = now(), updateAt = now()", newPost, (err, res) => {
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
  sql.query(
    `SELECT post.updateAt, user.pseudo, post.content, post.imageURL, comment.user_id, comment.updateAt ,comment.content FROM post INNER JOIN user ON post.user_id = user.id INNER JOIN comment ON post.id = comment.post_id ORDER BY post.updateAt DESC LIMIT 5 OFFSET ${offset}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("Posts: ", res);
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
