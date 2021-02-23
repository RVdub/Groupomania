const sql = require('../config/db.config');

class User {
  constructor(user) {
    this.email = user.email;
    this.pseudo = user.pseudo;
    this.password = user.password;
  }

  static create(user, callback) {
    sql.query("INSERT INTO user SET ?, createdAt = now(), updateAt = now()", user,
      (error, result) => {
        if (error) {
          callback(error.errno, 0);
          return;
        }
        callback(error, result.insertId);
      });
  }

  static findByPseudo(pseudo, callback) {
    sql.query('SELECT * FROM user WHERE pseudo = ?',
      pseudo, (error, result) => {
        if (error) {
          callback(error.errno, 0);
          return;
        }
        callback(error, result);
      });
  }

  static remove(userId, callback) {
    sql.query("DELETE FROM user WHERE id = ?", userId,
      (error, result) => {
        if (error) {
          callback(error.errno, 0);
          return;
        }
        callback(error, result);
      });
  }

  static findById(userId, callback) {
    sql.query("SELECT * FROM user WHERE id = ?", userId,
      (error, result) => {
        if (error) {
          callback(error.errno, 0);
          return;
        }
        callback(error, result);
      });
  }
  
  static updateById(userId, user, callback) {
    sql.query("UPDATE user SET ?, updateAt = now() WHERE id = ?", [user, userId],
      (error, result) => {
        if (error) {
          callback(error.errno, 0);
          return;
        }
        callback(error, result);
      });
  }
}

module.exports = User;

