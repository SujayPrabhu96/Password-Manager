module.exports = {
    isLoggedIn: (req, res, next) => {
        let errors = [];
        if(req.isAuthenticated()){
            return next();
        }
        errors.push({msg: 'You are logged out!!!'});
        res.render('users/login', {
            title: 'Login',
            errors
        });
    }
};