const express = require('express');
const router = express.Router();
const { displayForm , registerUser , checkEmailExists } = require('../Controllers/RegisterController');
const { displayLoginForm } = require('../Controllers/LoginController');
const { validationResult } = require('express-validator');
const  Validation  = require('../helpers/validate');

//Register routes
router.get('/register', displayForm);

router.post('/register', [Validation.validate_reg()], async (req , res) => {
    const errors = validationResult(req).errors;
    const { name, email, password , confirm_pwd } = req.body;
    try{
        const count = await checkEmailExists(email);
        if(count){
            errors.push({msg: 'Email already exists'});
        }
        if(password !== confirm_pwd){
            errors.push({msg: 'Password and Confirm Password should be same'});
        }
        if(errors.length){
            res.render('users/register', {
                title: 'Register',
                errors, name, email, password
            });
        }
        registerUser(req, res);

    } catch(error){
        
        errors.push({msg: error});
        res.render('users/register', {
            title: 'Register',
            errors, name, email, password
        });
    }
});

//Login routes
router.get('/login', displayLoginForm);

module.exports = router;