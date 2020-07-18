const { check } = require('express-validator');

const validate_reg = () => {
    return [ 
        check('name').trim().notEmpty().withMessage('Name field should not be Empty'),
        check('email').trim().notEmpty().withMessage('Email feild should not be Empty'),
        check('email').isEmail().withMessage('Email is not in proper format'),
        check('password').isLength({ min: 6}).withMessage('Password must be of atleast 6 characters'),
        check('confirm_pwd').isLength({ min: 6}).withMessage('Password must be of atleast 6 characters')         
    ];
};

const validate_login = () => {
    return [
        check('email').trim().notEmpty().withMessage('Email field should not be Empty'),
        check('email').isEmail().withMessage('Email is not in proper format')
    ];
};

const validate_pwd_form = () => {
    return[
        check('app').trim().notEmpty().withMessage('Application should not be Empty'),
        check('username').trim().notEmpty().withMessage('Username should not be empty')
    ];
};

module.exports.validate_reg = validate_reg;
module.exports.validate_login = validate_login;
module.exports.validate_pwd_form = validate_pwd_form;