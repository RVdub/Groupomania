const Post = require('../models/post');
const Comment = require('../models/comment');
const fs = require('fs');


exports.getAllPost = (req, res, next) => {
  Post.getAll((error, result) => {
    res.status(200).json(result);
  })
}

exports.getOnePost = (req, res, next) => {
  Post.getOne(req.params.id, (error, result) => {
    res.status(200).json(result);
  })
}

exports.createPost = (req, res, next) => {
  req.file = req.files[0];
  const post = new Post({
    user_id: req.body.user_id,
    content: req.body.content,
    imageURL: req.file ? `images/${req.file.filename}` : ""

  });
  Post.create(post, (error, result) => {
    res.status(200).json({ insertId: result.insertId })
  })
};

exports.deletePost = (req, res, next) => {
  Post.getOne(req.params.id, (error, post) => {
    const filename = post[0].imageURL.split('images/')[1];
    fs.unlink(`images/${filename}`, () => { })
  })
  Comment.deleteByPostId(req.params.id, (error, result) => {
    Post.delete(req.params.id, (error, result) => {
      res.status(200).json({ message: "Publication supprimée avec ses commentaires" });
    })
  })
}

exports.modifyPost = (req, res, next) => {
  req.file = req.files[0];
  Post.getOne(req.params.id, (error, post) => {
    let oldImageUrl = post[0].imageURL;
    if (req.file) {
      const oldFilename = oldImageUrl.split('images/')[1];
      fs.unlink(`images/${oldFilename}`, () => { });
      const post = new Post({
        user_id: req.body.user_id,
        content: req.body.content,
        imageURL: `images/${req.file.filename}`
      });
      Post.updateById(req.params.id, post, (error, result) => {
        res.status(201).json({ message: "Publication mise à jour avec photo" });
      })
    } else {
      const post = new Post({
        user_id: req.body.user_id,
        content: req.body.content,
        imageURL: oldImageUrl
      });
      Post.updateById(req.params.id, post, (error, result) => {
        res.status(201).json({ message: "Publication mise à jour" });
      })
    }
  })
}


