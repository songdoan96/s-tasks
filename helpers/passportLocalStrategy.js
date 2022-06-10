const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.use(
  new LocalStrategy({ passReqToCallback: true }, function (req, username, password, done) {
    User.findOne({ username }, async function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!(await user.checkPassword(password))) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, { _id: user._id, username: user.username });
  });
});
