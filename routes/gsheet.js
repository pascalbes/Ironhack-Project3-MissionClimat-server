const getSimulatorResults = require('../public/javascripts/getSimulatorResults.js');
const express = require("express");
const router = new express.Router();
const fs = require('fs');
const {google} = require('googleapis');
require("dotenv").config();

router.get("/download/:id", (req, res, next) => {
  const idSheet = req.params.id;
  console.log(idSheet);

  async function main() {
    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive']
      });

      const drive = google.drive({ version: 'v3', auth });

      var dest = fs.createWriteStream('../../../../../Ironhack');

      const response = await drive.files.export({
        fileId: idSheet,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      res.status(200).json({ results: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to download the file' });
    }
  }

  main();
});

// Copy spreadsheet and return the copy ID
router.get("/", (req, res, next) => {
  async function main() {
    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive']
      });

      const drive = google.drive({ version: "v3", auth });

      const dbRes = await drive.files.copy({ fileId: process.env.SPREADSHEET_MASTER_ID });

      await drive.permissions.create({
        fileId: dbRes.data.id,
        resource: {
          role: 'writer',
          type: 'anyone'
        }
      });

      res.status(200).json({ id: dbRes.data.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to copy the spreadsheet' });
    }
  }

  main();
});

// Retrieve the values from an existing spreadsheet
router.get("/values/:id", (req, res, next) => {
  const SCOPES = ['https://www.googleapis.com/auth/drive'];

  function formatNumber(number, isPercent) {
    let numberFormated = Number(number.replace(",", "."));
    if (isPercent == 1) numberFormated *= 100;
    return numberFormated;
  }

  async function main() {
    try {
      const auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/drive']
      });

      const idSheet = req.params.id;
      const rangeParams = 'Paramètres!F3:J37';
      const sheets = google.sheets({ version: 'v4', auth });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: idSheet,
        range: rangeParams
      });

      const rows = response.data.values;
      const values = [];

      rows.forEach(row => {
        if (!isNaN(Number(row[4].replace(",", ".")))) {
          values.push([formatNumber(row[4], row[0] === "%")]);
        } else {
          values.push([row[4]]);
        }
      });

      res.status(200).json({ values });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve values' });
    }
  }

  main();
});

// Update the sheet with new parameters and return the results
router.patch("/update/:id", (req, res, next) => {
  const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

  async function main() {
    try {
      const auth = new google.auth.GoogleAuth({ scopes: SCOPES });

      const idSheet = req.params.id;
      const values = req.body.values;
      const rangeParams = 'Paramètres!J3:J37';
      const rangeOutputs = 'Résultats!A1:BB300';
      const sheets = google.sheets({ version: 'v4', auth });

      await sheets.spreadsheets.values.update({
        spreadsheetId: idSheet,
        range: rangeParams,
        valueInputOption: 'RAW',
        resource: { values }
      });

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: idSheet,
        range: rangeOutputs
      });

      const rows = response.data.values;
      const results = getSimulatorResults(rows);

      res.status(200).json({ results });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update the spreadsheet' });
    }
  }

  main();
});

// Update only the parameters of the sheet
router.patch("/updateonly/:id", (req, res, next) => {
  const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

  async function main() {
    try {
      const auth = new google.auth.GoogleAuth({ scopes: SCOPES });

      const idSheet = req.params.id;
      const values = req.body.values;
      const rangeParams = 'Paramètres!J3:J37';
      const sheets = google.sheets({ version: 'v4', auth });

      await sheets.spreadsheets.values.update({
        spreadsheetId: idSheet,
        range: rangeParams,
        valueInputOption: 'RAW',
        resource: { values }
      });

      res.status(200).json({ response: "done" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update the parameters' });
    }
  }

  main();
});

// Delete a file by ID
router.delete("/delete/:id", (req, res, next) => {
  const idFile = req.params.id;
  const SCOPES = ['https://www.googleapis.com/auth/drive'];

  async function main() {
    try {
      const auth = new google.auth.GoogleAuth({ scopes: SCOPES });
      const drive = google.drive({ version: 'v3', auth });

      await drive.files.delete({ fileId: idFile });

      res.status(200).json({ data: `File ${idFile} deleted` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete the file' });
    }
  }

  main();
});

module.exports = router;
