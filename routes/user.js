const express = require('express');
const router = express.Router();
const {register, login, me, exists} = require('../controllers/userController');
const auth = require('../auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.post('/exists', exists)

module.exports = router;