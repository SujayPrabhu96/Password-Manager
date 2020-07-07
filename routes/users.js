const express = require('express');
const router = express.Router();
const { displayForm , registerUser } = require('../Controllers/RegisterController');

router.get('/register', displayForm);

router.post('/register', registerUser);

module.exports = router;