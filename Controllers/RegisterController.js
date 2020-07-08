const User = require('../models/User');

const displayForm = (req, res) => {
    res.render('users/register', {
        title: 'Register'
    });
};

const registerUser = (req, res) => {
    const errors = [];
    const { name , email , password, confirm_pwd } = req.body;
    User.create({ name, email, password})
    .then(user => res.render('users/register', {title: 'Register'})) //need to create login route
    .catch(error => {
        errors.push({msg: error});
        res.render('users/register', {
            title: 'Register',
            name, email, password, confirm_pwd, errors
        })
    });
};

const checkEmailExists = (email) => { 
    return new Promise((resolve, reject) => {
        User.count({
            where: {'email': email}
        })
        .then(count => resolve(count));
    });
};

module.exports.displayForm = displayForm;
module.exports.registerUser = registerUser;
module.exports.checkEmailExists = checkEmailExists;