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
<<<<<<< HEAD
=======
=======
>>>>>>> e3c7bf0826ba5256dd80bb02daf46a6a0eda2fe4
        req.login(user, (error) => {
            if(error){
                errors.push({msg: info.message});
                res.render('users/login', {
                    title: 'Login',
                    errors
                })
            }
            res.redirect('/apps/passwords');
        });
<<<<<<< HEAD
>>>>>>> Access only to authorized user for apps/passwords
=======
>>>>>>> e3c7bf0826ba5256dd80bb02daf46a6a0eda2fe4
    })(req, res, next);
}

module.exports.displayLoginForm = displayLoginForm;
module.exports.loginUser = loginUser;