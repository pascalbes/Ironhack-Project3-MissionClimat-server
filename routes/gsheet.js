const getSimulatorResults = require('../public/javascripts/getSimulatorResults.js')
const express = require("express");
const router = new express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require("dotenv").config();



router.get("/", (req, res, next) => {

  async function main () {
    
    const auth = new google.auth.GoogleAuth({
      // Scopes can be specified either as an array or as a single, space-delimited string.
      scopes: ['https://www.googleapis.com/auth/drive']
    });

    const drive = google.drive({version: 'v3', auth});

    drive.files.copy({fileId: process.env.SPREADSHEET_MASTER_ID})
          .then(dbRes => {
            res.status(200).json({ id:dbRes.data.id })
          })
          .catch(res.status(500))

    }
    main().catch(res.status(500))

});



//route permettant de récupérer les valeurs des paramètres d'une spreadsheet déjà créée
  router.get("/values/:id", (req, res, next) => {
  
    // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  
    function formatNumber(number, isPercent) {
      var numberFormated = Number(number.replace(",", "."))
      isPercent == 1 ? numberFormated *= 100 : "kikou"
      return numberFormated
    }
  
    async function main () {
        // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
        // environment variables.
        const auth = new google.auth.GoogleAuth({
          // Scopes can be specified either as an array or as a single, space-delimited string.
          scopes: ['https://www.googleapis.com/auth/drive']
        });

        const idSheet=req.params.id
        const rangeParams = 'Paramètres!E3:I25'

        const sheets = google.sheets({version: 'v4', auth});
    
        sheets.spreadsheets.values
        .get({
            spreadsheetId: idSheet,
            range: rangeParams,
        })
        .then(response => {

            var rows=response.data.values
            var values = []

            rows.forEach(row => {
            !isNaN(Number(row[4].replace(",","."))) ? values.push([formatNumber(row[4],row[0]==="%")]) : values.push([row[4]])
            })

            res.status(200).json({ values: values})
        })
        .catch(res.status(500))

    }
    main().catch(res.status(500))
  
  })
  



  router.patch("/update/:id", (req, res, next) => {
  
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

    async function main () {
        // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
        // environment variables.
        const auth = new google.auth.GoogleAuth({scopes: SCOPES})
  
        const idSheet=req.params.id
        const values=req.body.values
        const rangeParams = 'Paramètres!I3:I25'
        const rangeOutputs = 'Résultats!A1:AN150'

        const sheets = google.sheets({version: 'v4', auth});
    
        sheets.spreadsheets.values.update({
            spreadsheetId: idSheet,
            range: rangeParams,
            valueInputOption: 'RAW',
            "resource": {
            "values": values
            }
            })
        .then(response => {
            sheets.spreadsheets.values.get({
            spreadsheetId: idSheet,
            range: rangeOutputs,
            })
            .then(response => {
            var rows=response.data.values
            var results = getSimulatorResults(rows)
            res.status(200).json({ results: results})
            })
            .catch(res.status(500))
        })
        .catch(res.status(500))
  
    }
    main().catch(res.status(500))
  
  })

  router.delete("/delete/:id", (req, res, next) => {
  
    const idFile=req.params.id
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
  
    async function main () {
        // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
        // environment variables.
        const auth = new google.auth.GoogleAuth({scopes: SCOPES})
  
        const drive = google.drive({version: 'v3', auth});
    
        drive.files.delete({fileId: idFile})
            .then(dbRes => {
                res.status(200).json({ data:"File " + idFile + " deleted" })
            })
            .catch(err=> {
              res.status(500)
            })
  
    }
    main().catch(res.status(500))
  
  })

  module.exports = router;
  
  