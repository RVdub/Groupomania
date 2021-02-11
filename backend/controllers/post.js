const Post = require('../models/post');
const fs = require('fs'); // file system


exports.getAllPost = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  const post = new Post({
    user_id: req.body.userId,
    content: req.body.content,
    imageURL: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : ""
  }); console.log(post);
  Post.create(post, (err, res) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while creating the Post." })
    } else {
      res.status(201).send({ message: `Post publié !` })
    }
  })
};

exports.modifyPost = (req, res, next) => {
  let oldImageUrl;
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      oldImageUrl = sauce.imageUrl;
      goToUpdate();
    })
    .catch(error => res.status(404).json({ error }));
  function goToUpdate() {
    let sauceObject;
    if (req.file) {
      const oldFilename = oldImageUrl.split('/images/')[1];
      fs.unlinkSync(`images/${oldFilename}`);
      sauceObject = {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      };
    } else {
      sauceObject = {
        ...req.body
      }
    }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet sauce modifié !' }))
      .catch(error => res.status(400).json({ error }));
  }
};

exports.deletePost = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet sauce supprimé avec sa photo !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.userLikesPost = (req, res, next) => {
  if (req.body.like === 1) {
    Sauce.updateOne({ _id: req.params.id }, {
      $inc: { likes: 1 },
      $push: { usersLiked: req.body.userId },
      _id: req.params.id
    })
      .then(() => res.status(201).json({ message: 'Like ajouté' }))
      .catch(error => res.status(400).json({ error }));
  } else if (req.body.like === -1) {
    Sauce.updateOne({ _id: req.params.id }, {
      $inc: { dislikes: 1 },
      $push: { usersDisliked: req.body.userId },
      _id: req.params.id
    })
      .then(() => res.status(201).json({ message: 'Dislike ajouté' }))
      .catch(error => res.status(400).json({ error }));
  } else {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
            _id: req.params.id
          })
            .then(() => res.status(200).json({ message: 'Like retiré' }))
            .catch(error => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne({ _id: req.params.id }, {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
            _id: req.params.id
          })
            .then(() => res.status(200).json({ message: 'Dislike retiré' }))
            .catch(error => res.status(400).json({ error }));
        }
      })
      .catch(error => res.status(404).json({ error }));
  }
};

exports.userDislikesPost = (req, res, next) => {


};


