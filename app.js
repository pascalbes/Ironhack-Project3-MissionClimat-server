require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var enforce = require('express-sslify');


const session = require("express-session"); //sessions make data persist between http calls
const passport = require("passport"); // auth library (needs sessions)

var app = express();

if (process.env.NODE_ENV !== 'development') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
};
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());



var corsOptions = {
  origin: [process.env.FRONTEND_URI, process.env.FRONTEND_URL_SECURE],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "/public")));

app.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET_SESSION,
  })
);

app.use("/sheet", require("./routes/gsheet"));

app.use("*", (req, res, next) => {
  console.log("here");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

module.exports = app;