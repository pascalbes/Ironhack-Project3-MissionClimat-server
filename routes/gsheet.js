const express = require("express");
const router = new express.Router();
const bcryptjs = require("bcryptjs");
const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require("dotenv").config();



router.get("/", (req, res, next) => {
  
    fs.readFile('credentialsGDrive.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), copySheetFile);
    });
  
    function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile("tokenGDrive.json", (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
    }
  
    function copySheetFile(auth) {
        const drive = google.drive({version: 'v3', auth});
  
        drive.files.copy({fileId: process.env.SPREADSHEET_MASTER_ID})
            .then(dbRes => {
              res.status(200).json({ data:dbRes.data.id })
            })
            .catch(res.status(500))
  
      }
  
  });
  
  router.patch("/update/:id", (req, res, next) => {

    console.log("here")
    console.log(req.body)

    // ['Avec prolongation de la population'], ['Maintien des inégalités'], [40], [60], [45], [90],30],[18], [50],[30],[50],[2],[60],[80],[500000],[70],[30],[30],[50],[100],[85],[85],[85]
  
    const idSheet=req.params.id
    const values=req.body.values
    const rangeParams = 'Paramètres!I3:I25'
    const rangeOutputs = 'Résultats!A1:AN100'

  
    const TOKEN_PATH = 'tokenGSheet.json';
  
    // Load client secrets from a local file.
    fs.readFile('credentialsGSheet.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), main);
    });
  
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);
  
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }
  
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
  
  
    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1x64Flw5lHpcIHu5xGwU9v1uSK-MrB1rgCmoEynjdacc/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    
  
  
  
    //PARAMETRES
  
    function main(auth) {
  
  
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
          res.status(200).json({ data:rows })
        })
        .catch(res.status(500))
      })
      .catch(res.status(500))
  
    }
  
  })

  router.delete("/delete/:id", (req, res, next) => {
  
    const idFile=req.params.id
    const TOKEN_PATH = 'tokenGDrive.json';
  
    // Load client secrets from a local file.
    fs.readFile('credentialsGDrive.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), main);
    });
  
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);
  
      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }
  
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
  
  
    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1x64Flw5lHpcIHu5xGwU9v1uSK-MrB1rgCmoEynjdacc/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */
    
  
    function main(auth) {
  
        const drive = google.drive({version: 'v3', auth});
    
        drive.files.delete({fileId: idFile})
            .then(dbRes => {
                res.status(200).json({ data:"File " + idFile + " deleted" })
            })
            .catch(err=> {
              res.status(500)
            })
  
    }
  
  })

  module.exports = router;
  
  