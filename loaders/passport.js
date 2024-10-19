const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserModel = require('../models/user');

module.exports = async (app) => {

  // Initialize passport
  app.use(passport.initialize());  
  app.use(passport.session());
  
  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  // Configure local strategy to be use for local login
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {

        const user = await UserModel.findOneByEmail(username);

        // If no user found, reject
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password'});
        }

        // Check for matching passwords
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect username or password'});
        }

        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));
    
  return passport;
}