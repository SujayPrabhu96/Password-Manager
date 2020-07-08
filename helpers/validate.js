const { check } = require('express-validator');

const validate_reg = () => {
    return [ 
        check('name').notEmpty().withMessage('Name field should not be Empty'),
        check('email').notEmpty().withMessage('Email feild should not be Empty'),
        check('email').isEmail().withMessage('Email is not in proper format'),
        check('password').isLength({ min: 6}).withMessage('Password must be of atleast 6 characters'),
        check('confirm_pwd').isLength({ min: 6}).withMessage('Password must be of atleast 6 characters')         
    ];
};

module.exports.validate_reg = validate_reg;