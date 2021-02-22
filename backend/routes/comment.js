const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/', commentCtrl.createComment);
router.get('/getall/:id', commentCtrl.getPostComments);
router.get('/getone/:id', commentCtrl.getOneComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;

