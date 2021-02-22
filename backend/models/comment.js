const sql = require('../config/db.config');
const sanitizeHtml = require('sanitize-html');

class Comment {
  constructor(comment) {
    this.post_id = comment.post_id;
    this.user_id = comment.user_id;
    this.content = sanitizeHtml(comment.content);
  }

  static create(comment, callback) {
    sql.query("INSERT INTO comment SET ?, createdAt = now(), updateAt = now()", comment,
      (error, result) => {
        callback(error, result);
      });
  }

  static getPostComments(postId, callback) {
    sql.query(`SELECT comment.*,user.pseudo
        FROM comment,user
        WHERE comment.post_id = ?
        AND comment.user_id = user.id 
        ORDER BY comment.updateAt DESC`, postId,
      (error, result) => {
        callback(error, result);
      });
  };

  static getOne(commentId, callback) {
    sql.query(`SELECT comment.*,user.pseudo
        FROM comment,user
        WHERE comment.id = ?
        AND comment.user_id = user.id`, commentId,
      (error, result) => {
        callback(error, result);
      });
  };

  static delete(commentId, callback) {
    sql.query(`DELETE FROM comment WHERE id = ?`, commentId,
      (error, result) => {
        callback(error, result);
      });
  }

  static deleteByPostId = (postId, callback) => {
    sql.query(`DELETE FROM comment WHERE post_id = ?`, postId,
      (error, result) => {
        callback(error, result);
      });
  }

  static updateById(commentId, comment, callback) {
    sql.query("UPDATE comment SET ? WHERE id = ?", [comment, commentId],
      (error, result) => {
        callback(error, result);
      });
  }

}

module.exports = Comment;

