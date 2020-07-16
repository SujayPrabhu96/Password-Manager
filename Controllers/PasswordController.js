const AppPassword = require('../models/AppPasswords');

const listPasswords = (req, res) => {
    AppPassword.findAll({
        where: { user_id: req.user.id},
        attributes: ['date', 'app', 'username', 'password']
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

const displayAddForm = (req, res) => {
    res.render('apps/add_password', {
        title: 'Add Application-Password',
        isLoggedIn: true
    });
};

module.exports.listPasswords = listPasswords;
module.exports.displayAddForm = displayAddForm;