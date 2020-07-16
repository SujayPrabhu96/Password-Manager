const express = require('express');
const router = express.Router();
const { listPasswords, displayAddForm } = require('../Controllers/PasswordController');
const { isLoggedIn } = require('../auth');

router.get('/passwords', isLoggedIn, listPasswords);

router.get('/add-password', isLoggedIn, displayAddForm);

module.exports = router;