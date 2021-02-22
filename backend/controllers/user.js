const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');

const dotenv = require("dotenv").config();
if (dotenv.error) { throw dotenv.error };

const passwordValidator = require("password-validator");
const schema = new passwordValidator();
schema
  .is().min(8)
  .has().uppercase()
  .has().digits()
  .has().symbols();

const User = require('../models/user');


exports.signup = (req, res, next) => {
  if (!emailValidator.validate(req.body.email)) {
    throw res.status(400).json({ message: 'Adresse mail non valide !' })
  } else if (!schema.validate(req.body.password)) {
    throw res.status(400).json({ message: 'Mot de passe non valide !' })
  } else {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          pseudo: req.body.pseudo,
          password: hash,
        });
        User.create(user, (error, result) => {
          if (error) {
            res.status(401).json({ message: error || "Duplicate user !" })
          } else {
            res.status(201).json({
              userId: result,
              token: jwt.sign(
                { userId: result },
                process.env.AUTH_TOKEN,
                { expiresIn: '12h' },
              )
            })
          }
        })
      })
      .catch(error => res.status(500).json({ error }));
  }
};

exports.login = (req, res, next) => {
  User.findByPseudo(req.body.pseudo, (error, result) => {
    if (!result.length) {
      return res.status(401).json({ message: `Utilisateur non trouvé avec ce pseudo ${req.body.pseudo}.` });
    }
    bcrypt.compare(req.body.password, result[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(402).json({ error: 'Mot de passe incorrect !' });
        } else {
          res.status(201).json({
            userId: result[0].id,
            admin: result[0].admin,
            token: jwt.sign(
              { userId: result[0].id },
              process.env.AUTH_TOKEN,
              { expiresIn: '12h' },
            )
          });
        }
      })
      .catch(error => res.status(500).json({ error }));
  });
};

exports.disable = (req, res, next) => {
  User.remove(req.params.userId, (error, result) => {
    if (!result) {
      return res.status(402).json({ message: `Utilisateur ${req.params.userId} non trouvé !` });
    } else {
      User.removePost(req.params.userId);
      User.removeComment(req.params.userId);
      return res.status(200).json({ message: `Compte détruit avec succès !` });
    }
  });
};

exports.findUserId = (req, res, next) => {
  User.findById(req.params.userId, (error, result) => {
    if (!result.length) {
      return res.status(402).json({ message: `Utilisateur ${req.params.userId} non trouvé !` });
    } else {
      return res.status(201).json(result[0]);
    }
  });
};

exports.update = (req, res, next) => {
  if (!emailValidator.validate(req.body.email)) {
    throw res.status(400).json({ message: 'Adresse mail non valide !' })
  } else if (!schema.validate(req.body.password)) {
    throw res.status(400).json({ message: 'Mot de passe non valide !' });
  }
  let id = req.params.userId;
  if (req.body.oldPassword === req.body.password) {
    delete req.body.oldPassword;
    User.updateById(id, new User(req.body), (error, result) => {
      res.status(201).json({ message: "Contact mis à jour" });
    })
  } else {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          pseudo: req.body.pseudo,
          password: hash,
        });
        User.updateById(id, user, (error, result) => {
          res.status(201).json({ message: "Utilisateur mis à jour" });
        })
      })
      .catch(error => res.status(500).json({ error }));
  }
};

