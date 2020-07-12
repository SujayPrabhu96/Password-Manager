const express = require('express');
const router = express.Router();
const { listPasswords } = require('../Controllers/PasswordController');
const { isLoggedIn } = require('../auth');

router.get('/passwords', isLoggedIn, listPasswords);

module.exports = router;