const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/disable', userCtrl.disable);
router.put('/modifyAccount', userCtrl.update);
router.get('/:userId', userCtrl.findUserId);

module.exports = router;

