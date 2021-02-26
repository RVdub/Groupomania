const sql = require('../config/db.config');
const sanitizeHtml = require('sanitize-html');

class Post {
  constructor(post) {
    this.user_id = post.user_id;
    this.content = sanitizeHtml(post.content);
    this.imageURL = post.imageURL;
  }

  static create(post, callback) {
    sql.query("INSERT INTO post SET ?, createdAt = now(), updateAt = now()", post,
      (error, result) => {
        callback(error, result);
      });
  }

  static getAll(callback) {
    sql.query(`SELECT post.*, user.pseudo
        FROM post, user
        WHERE post.user_id = user.id 
        ORDER BY post.updateAt DESC`,
      (error, result) => {
        callback(error, result);
      });
  }

  static getOne(postId, callback) {
    sql.query(`SELECT post.*, user.pseudo
        FROM post, user
        WHERE post.user_id = user.id AND post.id = ?`, postId,
      (error, result) => {
        callback(error, result);
      });
  };

  static delete = (postId, callBack) => {
    sql.query(`DELETE FROM post WHERE id = ?`, postId,
      (error, result) => {
        callBack(error, result);
      });
  }

  static updateById(postId, post, callback) {
    sql.query("UPDATE post SET ?, updateAt = now() WHERE id = ?", [post, postId],
      (error, result) => {
        callback(error, result);
      }
    );
  }

  static getByUserId(userId, callback) {
    sql.query("SELECT * FROM post WHERE user_id = ?", userId,
      (error, result) => {
        if (error) {
          callback(error.errno, 0);
          return;
        }
        callback(error, result);
      });
  }

  static deleteByUserId(userId, callback) {
    sql.query(`SET SQL_SAFE_UPDATES = 0;
              DELETE FROM post WHERE user_id = ?;
              SET SQL_SAFE_UPDATES = 1;`, userId,
      (error, result) => {
        if (error) {
          callback(error.errno, 0);
          return;
        }
        callback(error, result);
      });
  }

}


module.exports = Post;
