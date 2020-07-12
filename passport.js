const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');

module.exports = (passport) => {
        passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if(!user){
                    return done(null, false, {message: 'Email is not registered'})
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err){
                        return done(err);
                    }
                    if(isMatch){
                        return done(null, user);
                    }
                    return done(null, false, {message: 'Incorrect Password'});
                })
            })
            .catch(error => {
                return done(null, false, {message: 'Something Went Wrong with SignIn'})
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findByPk(id)
        .then(user => {
            if(!user){
                return done(null, false, {message: 'Wrong User Id'});
            }
            done(null, user);
        });
    });
}; 