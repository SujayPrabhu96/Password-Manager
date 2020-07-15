const AppPassword = require('../models/AppPasswords');

const listPasswords = (req, res) => {
    AppPassword.findAll({
        attributes: ['date', 'app', 'password']
    })
    .then(data => {
        res.render('apps/passwords', {
            title: 'Application-Passwords',
            isLoggedIn: true,
            data
        });
    })
    .catch(error => {
        let errors = [];
        errors.push({msg: error});
        res.render('apps/passwords', {
            title: 'Application-Passwords',
            isLoggedIn: true,
            errors
        })
    });
};

module.exports.listPasswords = listPasswords;