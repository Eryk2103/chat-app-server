const express = require('express');
const router = express.Router();
const {register, login, me} = require('../controllers/userController');
const auth = require('../auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);

module.exports = router;