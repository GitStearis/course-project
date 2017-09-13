const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/users");

mongoose.Promise = Promise;

passport.use(
    new LocalStrategy({
            usernameField: "email"
        },
        function(username, password, done) {
            User.findOne({ email: username }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: "user not found or not verified"
                    });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: "password is wrong"
                    });
                }
                return done(null, user);
            });
        }
    )
);