const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/post', postCtrl.getAllPost);
router.post('/post', multer, postCtrl.createPost);
router.put('/post/:id', multer, postCtrl.modifyPost);
router.delete('/post/:id', postCtrl.deletePost);
//router.post('/post/:id/like', auth, postCtrl.userLikesPost);
//router.post('/post/:id/dislike', auth, postCtrl.userDislikesPost);

module.exports = router;

