const express = require('express');
const router = express.Router();
const { listPasswords, displayAddForm, savePassword, deletePassword } = require('../Controllers/PasswordController');
const { isLoggedIn } = require('../auth');
const { validationResult } = require('express-validator');
const Validation = require('../helpers/validate');

router.get('/passwords', isLoggedIn, listPasswords);

router.get('/add-password', isLoggedIn, displayAddForm);

router.post('/add-password', [Validation.validate_pwd_form()], isLoggedIn, (req, res) => {
    const errors = validationResult(req).errors;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    if(password != confirm_password){
        errors.push({msg: 'Password and Confirm Password should be same'});
        res.render('apps/add_password', {
            title: 'Add Application-Password',
            isLoggedIn: true,
            errors
        });
    }
    savePassword(req, res);
});

router.get('/delete-password/:id', deletePassword);

module.exports = router;