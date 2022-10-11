const express = require('express');
const router = express.Router();
const {createRoom, getRooms} = require('../controllers/roomController')
const auth = require('../auth');

router.post('/', auth, createRoom);
router.get('/', auth, getRooms);

module.exports = router;