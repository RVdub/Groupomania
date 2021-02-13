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
        User.create(user, (err, result) => {
          if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Customer." })
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
  User.findByPseudo(req.body.pseudo, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(401).json({ message: `Utilisateur non trouvé avec ce pseudo ${req.body.pseudo}.` });
      } else {
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur " + req.body.pseudo });
      }
    } else {
      bcrypt.compare(req.body.password, result[0].password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
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
    }
  });
};

exports.disable = (req, res, next) => {
  User.remove(req.body.userId, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Utilisateur ${req.body.id} non trouvé !` });
      } else {
        res.status(500).send({ message: `Utilisateur ${req.body.id} non supprimé !` });
      }
    } else res.status(201).send({ message: `Compte détruit avec succès !` });
  });
};

exports.findUserId = (req, res, next) => {
  User.findById(req.params.userId, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Utilisateur non trouvé avec id ${req.params.userId}.` });
      } else {
        res.status(500).send({ message: "Erreur lors de la récupération du client avec l'ID: " + req.params.userId });
      }
    } else res.status(200).send(result);
  });
};

exports.update = (req, res, next) => {
  if (!emailValidator.validate(req.body.email)) {
    throw res.status(400).json({ message: 'Adresse mail non valide !' })
  } else if (!schema.validate(req.body.password)) {
    throw res.status(400).json({ message: 'Mot de passe non valide !' });
  }
  let id = req.body.userId;
  delete req.body.userId;
  if (req.body.oldPassword === req.body.password) {
    delete req.body.oldPassword;
    User.updateById(id, new User(req.body), (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({ message: `Utilisateur non trouvé avec id ${req.body.userId}.` });
        } else {
          res.status(500).send({ message: "Erreur lors de la modification avec id utilisateur: " + req.body.userId });
        }
      } else {
        res.status(201).send({ message: "Contact mis à jour" });
      }
    })
  } else {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          pseudo: req.body.pseudo,
          password: hash,
        });
        User.updateById(id, user, (err, result) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({ message: `Utilisateur non trouvé avec id ${req.body.userId}.` });
            } else {
              res.status(500).send({ message: "Erreur lors de la modification avec id utilisateur: " + req.body.userId });
            }
          } else {
            res.status(201).send({ message: "Utilisateur mis à jour" });
          }
        })
      })
      .catch(error => res.status(500).json({ error }));
  }
};

