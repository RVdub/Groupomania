const sql = require('../config/db.config');

// constructor
class User {
  constructor(user) {
    this.email = user.email;
    this.pseudo = user.pseudo;
    this.password = user.password;
    this.admin;
    this.createdAt;
    this.updateAt;
  }
  static create(user, result) {
    sql.query("INSERT INTO user SET ?, createdAt = now(), updateAt = now()", user, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res.insertId);
    });
  }
  static findByPseudo(pseudo, result) {
    sql.query('SELECT * FROM user WHERE pseudo = ?', pseudo, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  }
  static remove(userId, result) {
    sql.query("DELETE FROM user WHERE id = ?", userId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted customer with id: ", userId);
      result(null, res);
    });
  }
  static findById(userId, result) {
    sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("find user: ", userId);
      result(null, res);
    });
  }
  static updateById(userId, user, result) {
    sql.query("UPDATE user SET ?, updateAt = now() WHERE id = ?", [user, userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", userId);
      result(null, res);
    });
  }
}

module.exports = User;

