require("dotenv").config();
require("./config/dbConnection");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var app = express();

var corsOptions = {
    origin: process.env.FRONTEND_URI
  }

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));
app.use('/sheet', require('./routes/gsheet'));

module.exports = app;
