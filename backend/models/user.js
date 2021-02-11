const sql = require('../config/db.config');

// constructor
const User = function (user) {
  this.email = user.email;
  this.pseudo = user.pseudo;
  this.password = user.password;
  this.admin;
  this.createdAt;
  this.updateAt;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?, createdAt = now(), updateAt = now()", newUser,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res.insertId);
    });
};

User.findByPseudo = (pseudo, result) => {
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
    result({ kind: "not_found" }, null);  // not found Customer with the id
  });
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) { // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
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
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET ? WHERE id = ?", [user, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = User;
