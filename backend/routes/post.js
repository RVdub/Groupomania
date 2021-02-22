const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.post('/', multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;

