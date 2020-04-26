const express = require("express");
const router = new express.Router();
require("dotenv").config();


// HELP JE SAIS PAS COMMENT CONNECTER BIEN LES DEUX 



var nodemailer = require('nodemailer');

var transport = {
    host: 'smtp.mail.com', // can be changed
    auth: {
        user: process.env.SENDMAIL, //can be changed
        pass: process.env.SENDPWD // can be changed
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post("/contact", (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var topic = req.body.topic
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n topic: ${topic} \n message: ${message}`

    var mail = {
        from: name,
        to: 'mission-climat@mail.com', //can be changed
        subject: topic,
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
})

module.exports = router;