const User = require('../models/User');

const displayForm = (req, res) => {
    res.render('users/register', {
        title: 'Register'
    });
};

module.exports.displayForm = displayForm;