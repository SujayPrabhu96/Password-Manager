const express = require('express');
const router = express.Router();
const { displayForm } = require('../Controllers/RegisterController');

router.get('/register', displayForm);

module.exports = router;