<<<<<<< HEAD
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const AppPassword = require('../models/AppPasswords');

const listPasswords = (req, res) => {
    AppPassword.findAll({
        where: { user_id: req.user.id},
        attributes: ['date', 'app', 'username', 'password']
    })
    .then(data => {
        data.map((app) => app.password = cryptr.decrypt(app.password));
        res.render('apps/passwords', {
            title: 'Application-Passwords',
            isLoggedIn: true,
            data
        });
    })
    .catch(error => {
        let errors = [];
        errors.push({msg: error});
        res.render('apps/passwords', {
            title: 'Application-Passwords',
            isLoggedIn: true,
            errors
        })
    });
};

const displayAddForm = (req, res) => {
    res.render('apps/add_password', {
        title: 'Add Application-Password',
        isLoggedIn: true
    });
};

const userAppExists = async (user_id, app) => {
    try{
        return await AppPassword.count({ where: {'user_id': user_id, 'app': app}});
    } catch(error){
        throw new Error(error);
    }
};

const updatePassword = async(user_id, params) => {
    try{
        let { app, username, password } = params;
        password = cryptr.encrypt(password);
        return await AppPassword.update(
            { app, username, password },
            { where: { 'user_id': user_id, 'app': app } }
        );
    } catch(error) {
        throw new Error(errro);
    }
};

const savePassword = async(req, res) => {
    const user_id = req.user.id;
    const date = new Date().toISOString().slice(0, 10);
    let { app, username, password } = req.body;
    password = cryptr.encrypt(password);
    try{
        let count = await userAppExists(user_id, app); //check if entry is present for app with logged in user
        if(count){
            await updatePassword(user_id, req.body);
        } else {
            await AppPassword.create({ user_id, date, app, username, password });
        }
        res.redirect('/apps/passwords');
    } catch(error) {
        let errors = [];
        errors.push({msg: error});
        res.render('apps/add_password', {
            title: 'Add Application-Password',
            isLoggedIn: true,
            errors
        });
    }
    
}

module.exports.listPasswords = listPasswords;
module.exports.displayAddForm = displayAddForm;
module.exports.savePassword = savePassword;
=======
const listPasswords = (req, res) => {
    res.render('apps/passwords', {
        title: 'Application-Passwords',
        isLoggedIn: req.isLogged
    });
};

module.exports.listPasswords = listPasswords;
>>>>>>> Access only to authorized user for apps/passwords