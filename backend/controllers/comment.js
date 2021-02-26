const Comment = require('../models/comment');


exports.createComment = (req, res, next) => {
  const comment = new Comment(req.body);
  Comment.create(comment, (error, result) => {
    res.status(201).json({ insertId: result.insertId })
  })
}

exports.getPostComments = (req, res, next) => {
  Comment.getPostComments(req.params.id, (error, result) => {
    res.status(200).json(result);
  })
}

exports.getOneComment = (req, res, next) => {
  Comment.getOne(req.params.id, (error, result) => {
    res.status(200).json(result);
  })
}

exports.deleteComment = (req, res, next) => {
  Comment.delete(req.params.id, (error, result) => {
    res.status(200).json({ message: "Commentaire supprimé" });
  })
}

exports.modifyComment = (req, res, next) => {
  const comment = new Comment(req.body);
  Comment.updateById(req.params.id, comment, (error, result) => {
    res.status(201).json({ message: "Commentaire mis à jour" });
  }) 
}

