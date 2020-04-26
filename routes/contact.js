const express = require("express");
const router = new express.Router();
require("dotenv").config();

var nodemailer = require('nodemailer');
// HELP JE SAIS PAS COMMENT CONNECTER BIEN LES DEUX 

router.post("/send", (req, res, next) => {

    console.log(req.body)

    var transporter = nodemailer.createTransport({
        host: 'smtp.mail.com', // can be changed
        secure: false, // use SSL
        port: 25, // port for secure SMTP
        auth: {
            user: process.env.SENDMAIL, //can be changed
            pass: process.env.SENDPWD // can be changed
        },
        tls: {
            rejectUnauthorized: false
        }
      });
      
      var mailOptions = {
        from: 'machin@gmail.com',
        to: 'mission-climat@mail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ msg: 'success' })
        }
      });

})

module.exports = router;