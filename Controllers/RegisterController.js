const User = require('../models/User');
const bcrypt = require('bcryptjs');

const generateHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if(err) reject('Something Went Wrong');
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) reject('Something Went Wrong');
                resolve(hash);
            });
        });
    });
};

const displayForm = (req, res) => {
    res.render('users/register', {
        title: 'Register'
    });
};

const registerUser = async (req, res) => {
    const errors = [];
    let { name , email , password, confirm_pwd } = req.body;
    try{
        password = await generateHash(password);
        await User.create({ name, email, password});
        res.render('users/login', {title: 'Login'});
    } catch(error){
        errors.push({msg: error});
        res.render('users/register', {
            title: 'Register',
            name, email, password, errors
        });
    }
};

const checkEmailExists = async (email) => { 
    try{
        return await User.count({ where: {'email': email} });
    } catch(error){
        throw new Error(error);
    }
};

module.exports.displayForm = displayForm;
module.exports.registerUser = registerUser;
module.exports.checkEmailExists = checkEmailExists;