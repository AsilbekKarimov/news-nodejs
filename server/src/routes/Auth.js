const express = require('express');
const { AuthPost } = require('../controllers/Auth');
const router = express.Router();

router.post('/', AuthPost)

module.exports = router;
