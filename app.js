require("dotenv").config();
require("./config/dbConnection");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


require("./config/mongo"); // database connection setup
require("./config/passport");
// dependencies injection
const session = require("express-session"); //sessions make data persist between http calls
const passport = require("passport"); // auth library (needs sessions)

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION
  })
);

var corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true,
    optionsSuccessStatus: 200
  }
console.log(process.env.FRONTEND_URI);
app.use(cors(corsOptions))




app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {res.send("hello world")})

app.use('/session', require('./routes/auth'))
app.use('/users', require('./routes/users'));
app.use('/sheet', require('./routes/gsheet'));

module.exports = app;
