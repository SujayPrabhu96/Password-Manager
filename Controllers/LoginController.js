const User = require('../models/User');

const displayLoginForm = (req, res) => {
    res.render('users/login', {
        title: 'Login'
    });
};

module.exports.displayLoginForm = displayLoginForm;