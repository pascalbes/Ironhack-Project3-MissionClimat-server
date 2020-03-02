const passport = require("passport");
const bcryptjs = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/User");

passport.serializeUser((user, done) => {
  // console.log("@serializeUser", user);
  done(null, user._id);
  // hint : the user._id is written in session.
  // req.session.passport.user = {_id: '..'}
  // used later as "id" while getting the full object @ deserializeUser("id", done)
});

passport.deserializeUser((id, done) => {
  // this middleware adds user object to req.user
  // console.log("@deserializeUser", id);
  userModel
    .findById(id)
    .then(user => {
      // console.log("ok : passport.deserializeUser, user found in db ", user);
      done(null, user);
    })
    .catch(err => {
      // console.log("error: passport.deserializeUser, user NOT fetched from db ");
      done(err, null);
    });
});

// this function setup a local strategy and provides logic for login action
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // change default username credential to email
    function(email, passwd, next) {
      // console.log("local strategy", email, passwd);
      userModel
        .findOne({ email: email })
        .then(user => {
          // console.log("@ LocalStrategy :::: found user in db :", user);
          // db query success
          if (!user) return next(null, false, "Incorrect signin infos");

          if (!bcryptjs.compareSync(passwd, user.password)) {
            // if provided password is not valid
            return next(null, false, "Incorrect signin infos");
          } else next(null, user); // it's all good my coder friend !
        })
        .catch(dbErr => next(dbErr, null)); // if the db query fail...
    }
  )
);
