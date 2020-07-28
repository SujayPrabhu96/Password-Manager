const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');

module.exports = (passport) => {
        passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
            try{
                let user = await User.findOne({ where: { email: email } });
                if(!user){
                    return done(null, false, {message: 'Email or Password is Incorrect'})
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err){
                        return done(err);
                    }
                    if(isMatch){
                        return done(null, user);
                    }
                    return done(null, false, {message: 'Incorrect Password'});
                });
            } catch(error){
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
<<<<<<< HEAD
    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findByPk(id);
=======
    passport.deserializeUser((id, done) => {
        User.findByPk(id)
        .then(user => {
<<<<<<< HEAD
>>>>>>> Access only to authorized user for apps/passwords
=======
>>>>>>> e3c7bf0826ba5256dd80bb02daf46a6a0eda2fe4
            if(!user){
                return done(null, false, {message: 'Wrong User Id'});
            }
            done(null, user);
<<<<<<< HEAD
<<<<<<< HEAD
        } catch(error) {
            done(error);
        }
=======
=======
>>>>>>> e3c7bf0826ba5256dd80bb02daf46a6a0eda2fe4
        });
>>>>>>> Access only to authorized user for apps/passwords
    });
}; 