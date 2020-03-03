const getSimulatorResults = require('../public/javascripts/getSimulatorResults.js')
const express = require("express");
const router = new express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require("dotenv").config();
const compute = google.compute('v1');



//route permettant de dupliquer la sheet master et de renvoyer l'ID de la spreadsheet créée
router.get("/", (req, res, next) => {

  // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = 'tokenGDrive.json';
  
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
  fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
  });
  }

//   **
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */

  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }


  function copySheetFile(auth) {
      const drive = google.drive({version: 'v3', auth});

      drive.files.copy({fileId: process.env.SPREADSHEET_MASTER_ID})
          .then(dbRes => {
            res.status(200).json({ id:dbRes.data.id })
          })
          .catch(res.status(500))

    }

});





//route permettant de récupérer les valeurs des paramètres d'une spreadsheet déjà créée
  router.get("/values/:id", (req, res, next) => {
  
    // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = 'tokenGDrive.json';
  
  fs.readFile('credentialsGDrive.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), getInfos);
  });

  function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
  });
  }

//   **
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */

  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

    function formatNumber(number, isPercent) {
      var numberFormated = Number(number.replace(",", "."))
      isPercent == 1 ? numberFormated *= 100 : "kikou"
      return numberFormated
    }
  
    function getInfos(auth) {

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
  
  })
  
  router.patch("/update/:id", (req, res, next) => {
  
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    const TOKEN_PATH = 'tokenGSheet.json';
  
    // Load client secrets from a local file.
    fs.readFile('credentialsGSheet.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), main);
    });
  
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
  
    function getNewToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error while trying to retrieve access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }
    
    function main(auth) {
  
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
  
  })

  router.delete("/delete/:id", (req, res, next) => {
  
    const idFile=req.params.id
    const TOKEN_PATH = 'tokenGDrive.json';
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
  
    // Load client secrets from a local file.
    fs.readFile('credentialsGDrive.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), main);
    });
  
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

    function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }
  
  
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
  
  