const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'Email', passwordField: 'Password' },
        (username, password, done) => {
            User.findOne({ Email: username },
                (error, user) => {
                    if (error) {
                        return done(error);
                    }
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'No User is registered with this Email' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Incorrect password' });
                    // authentication successful
                    else
                        return done(null, user);
                });
        })
);