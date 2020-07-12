const listPasswords = (req, res) => {
    console.log(req.isLogged);
    res.render('apps/passwords', {
        title: 'Application-Passwords',
        isLoggedIn: true
    });
};

module.exports.listPasswords = listPasswords;