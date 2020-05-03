const express = require("express");
const router = express.Router();
const emailModel = require("../models/Email");

router.post("/:email", (req, res) => {
    
    const email = req.params.email;
  
    if (!email) {
        res.status(200).json({ message: "email vide"})
    } else {
        emailModel
        .findOne({
          email: email
        })
        .then(dbRes => {
            console.log(dbRes)
          if (dbRes) {
            res.status(200).json({ message: "email déjà en base"})
          }
          else {
            emailModel
            .create({email: email})
            .then(response => {
                res.status(200).json({ message: "email sauvegardé"})
            });
          }
        })
        .catch(res.status(500))
    }
  });

  module.exports = router;