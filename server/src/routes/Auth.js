const express = require('express');
const { AuthPost, LoginPost } = require('../controllers/Auth');
const router = express.Router();
router.post('/', AuthPost);
router.post('/login', LoginPost);

module.exports = router;
