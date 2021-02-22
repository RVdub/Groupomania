const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:userId', userCtrl.disable);
router.put('/:userId', userCtrl.update);
router.get('/:userId', userCtrl.findUserId);

module.exports = router;

