const express = require('express');
const router = express.Router();
const { listPasswords, displayAddForm, savePassword } = require('../Controllers/PasswordController');
const { isLoggedIn } = require('../auth');

router.get('/passwords', isLoggedIn, listPasswords);

router.get('/add-password', isLoggedIn, displayAddForm);

router.post('/save-password', isLoggedIn, savePassword);

module.exports = router;