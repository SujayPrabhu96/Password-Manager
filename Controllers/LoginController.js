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
        if(!user){
            errors.push({msg: info.message});
            res.render('users/login', {
                title: 'Login',
                errors
            })
        } else {
            req.login(user, (error) => {
                if(error){
                    errors.push({msg: error});
                    res.render('users/login', {
                        title: 'Login',
                        errors
                    })
                } else {
                    res.redirect('/apps/passwords');
                }
            });
        }
<<<<<<< HEAD
=======
        req.login(user, (error) => {
            if(error){
                errors.push({msg: info.message});
                res.render('users/login', {
                    title: 'Login',
                    errors
                })
            }
            res.render('apps/passwords', {title: 'Application-Passwords'});
        });
>>>>>>> Access only to authorized user for apps/passwords
    })(req, res, next);
}

module.exports.displayLoginForm = displayLoginForm;
module.exports.loginUser = loginUser;