const Comment = require('../models/comment');


exports.createComment = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet sauce enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifyComment = (req, res, next) => {
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

exports.deleteComment = (req, res, next) => {
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