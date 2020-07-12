const listPasswords = (req, res) => {
    res.render('apps/passwords', {
        title: 'Application-Passwords',
        isLoggedIn: req.isLogged
    });
};

module.exports.listPasswords = listPasswords;