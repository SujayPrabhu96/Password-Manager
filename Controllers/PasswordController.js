const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const nodemailer = require('nodemailer');
const fs = require('fs');
const User = require('../models/User');
const AppPassword = require('../models/AppPasswords');
const { generatePDF } = require('./PDFController');
const { email_host, email_port, email_user, email_password } = require('../config');

const listPasswords = (req, res) => {
    AppPassword.findAll({
        where: { user_id: req.user.id},
        attributes: ['id', 'date', 'app', 'username', 'password']
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
        throw new Error(error);
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

const displayEditForm = async(req, res) => {
    try{
        let app_data = await AppPassword.findOne({ where: { id: req.params.id } });
        res.render('apps/edit_password', {
            title: 'Edit Application-Password',
            isLoggedIn: true,
            data: app_data
        });
    } catch(error) {
        let errors = [];
        errors.push({msg: error});
        res.render('apps/edit_password', {
            title: 'Edit Application-Password',
            isLoggedIn: true,
            errors
        });
    }
};

const deletePassword = (req, res) => {
    AppPassword.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(res.redirect('/apps/passwords'))
    .catch(error => {
        res.render('apps/add_password', {
            title: 'Add Application-Password',
            isLoggedIn: true,
            errors
        });
    });
};

const editPassword = async (req, res) => {
    const user_id = req.user.id;
    try{
        await updatePassword(user_id, req.body);
        res.redirect('/apps/passwords');
    } catch(error) {
        let errors = [];
        errors.push({msg: error});
        res.render('apps/edit_password', {
            title: 'Edit Application-Password',
            isLoggedIn: true,
            errors
        });
    }
};

const sendMail = async (req, res) => {
    try{
        const user = await User.findOne({ where: {id: req.user.id}, attributes:['name', 'email'] });
        const app_data = await AppPassword.findAll({ where: {user_id: req.user.id} });
        app_data.map((val) => val.password = cryptr.decrypt(val.password));
        const pdf = await generatePDF(app_data);
        
        let transporter = nodemailer.createTransport({
            host: email_host,
            port: email_port,
            secure: false,
            requireTLS: true,
            auth: {
                user: email_user,
                pass: email_password 
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        let mailOptions = {
             from: email_user,
             to: user.email,
             subject: 'Application Passwords List',
             text: `Hi ${user.name}, here is the list of applications and its credentials.`,
             attachments: [{
                filename: pdf,
                path: pdf
             }]
        };

        const { error, info } = await transporter.sendMail(mailOptions);
        if (error) {
            let errors = [];
            errors.push({msg: error.message});
            res.render('apps/passwords', {
                title: 'Application-Passwords',
                isLoggedIn: true,
                errors,
                data: []
            });
        } else {
            fs.unlinkSync(pdf);
            res.redirect('/apps/passwords');
        }
    } catch(error){
        console.log(error);
        let errors = [];
        errors.push({msg: error});
        res.render('apps/passwords', {
            title: 'Application-Passwords',
            isLoggedIn: true,
            errors,
            data: []
        });
    }
 
};



module.exports.listPasswords = listPasswords;
module.exports.displayAddForm = displayAddForm;
module.exports.savePassword = savePassword;
module.exports.displayEditForm = displayEditForm;
module.exports.editPassword = editPassword;
module.exports.deletePassword = deletePassword;
module.exports.sendMail = sendMail;

