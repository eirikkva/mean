import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'User not found'
          });
        }
        // Return if password is wrong
        if (!user.validatePassword(password)) {
          return done(null, false, {
            message: 'Password is wrong'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);
