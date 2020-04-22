const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const passport = require("passport");
const bcryptjs = require("bcryptjs");

const minPasswordLength = 8;

router.post("/signup", (req, res, next) => {
    var errorMsg = "";
    console.log(req.body)
    const { email, password, isNewsLetter } = req.body;
    // @todo : best if email validation here or check with a regex in the User model
    if (!password || !email) errorMsg += "Provide email and password.\n";
  
    if (password.length < minPasswordLength)
      errorMsg += `Please make your password at least ${minPasswordLength} characters.`;
  
    if (errorMsg) return res.status(403).json(errorMsg); // 403	Forbidden
  
    const salt = bcryptjs.genSaltSync(10);
    // more on encryption : https://en.wikipedia.org/wiki/Salt_(cryptography)
    const hashPass = bcryptjs.hashSync(password, salt);
  
    const newUser = {
      email,
      password: hashPass,
      isNewsLetter
    };
  
    userModel
      .create(newUser)
      .then(newUserFromDB => {
        res.status(200).json({msg: "signup ok"});
      })
      .catch(err => {
        console.log("signup error", err);
        next(err);
      });
  });

  
router.post("/signin", (req, res, next) => {
    passport.authenticate("local", (err, user, failureDetails) => {
      if (err || !user) return res.status(403).json("invalid user infos"); // 403 : Forbidden
  
      req.logIn(user, function(err) {
        
        if (err) {
          return res.json({ message: "Something went wrong logging in" });
        }
  
        const { _id, email, isNewsLetter, scenarios} = user;
        
          res.status(200).json({
            currentUser: {
              _id,
              email,
              isNewsLetter,
              scenarios
            }
          })
      });
    })(req, res, next); // IIFE (module) pattern here (see passport documentation)
  });
  
  router.post("/signout", (req, res, next) => {
    req.logout(); // utility function provided by passport
    res.json({ message: "Success" });
  });
  
  router.use("/is-loggedin", (req, res, next) => {
    if (req.isAuthenticated()) {
      // method provided by passport
      const { _id, email, isNewsLetter, scenarios } = req.user;
      return res.status(200).json({
        currentUser: {
          _id,
          email,
          isNewsLetter,
          scenarios
        }
      });
    }
    res.status(403).json("Unauthorized");
  });
  
  module.exports = router;
  