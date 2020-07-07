const User = require('../models/User');

const displayForm = (req, res) => {
    res.render('users/register', {
        title: 'Register'
    });
};

const registerUser = (req, res) => {
    const { name , email , password, confirm_pwd } = req.body;
    User.create({ name, email, password})
    .then(user => console.log(user))
    .catch(error => console.log(error));
};

module.exports.displayForm = displayForm;
module.exports.registerUser = registerUser;