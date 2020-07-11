const passport = require('passport');
const User = require('../models/User');

const displayLoginForm = (req, res) => {
    res.render('users/login', {
        title: 'Login'
    });
};

const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        let errors = [];
        console.log(info);
        if(!user){
            errors.push({msg: info.message});
            res.render('users/login', {
                title: 'Login',
                errors
            })
        }
        res.render('apps/passwords', {title: 'Application-Passwords'});
    })(req, res, next);
}

module.exports.displayLoginForm = displayLoginForm;
module.exports.loginUser = loginUser;