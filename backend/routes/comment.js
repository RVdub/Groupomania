const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/comment', commentCtrl.createComment);
router.put('/comment/:id', commentCtrl.modifyComment);
router.delete('/comment/:id', commentCtrl.deleteComment);

module.exports = router;

