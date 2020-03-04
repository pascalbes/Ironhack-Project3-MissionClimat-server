const getSimulatorResults = require('../public/javascripts/getSimulatorResults.js')
const express = require("express");
const router = new express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require("dotenv").config();
const {auth} = require('google-auth-library');



router.get("/", (req, res, next) => {


    const keysEnvVar = process.env['CREDS'];
    if (!keysEnvVar) {
    throw new Error('The $CREDS environment variable was not found!');
    }
    const keys = JSON.parse(keysEnvVar);

    console.log(keys)

    async function main() {
        
        const client = auth.fromJSON(keys);
        client.scopes = ['https://www.googleapis.com/auth/drive'];
        const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
        const res = await client.request({url});
        console.log(res.data);

        const drive = google.drive({version: 'v3', client});

        drive.files.copy({fileId: process.env.SPREADSHEET_MASTER_ID})
        .then(dbRes => {
            res.status(200).json({ id:dbRes.data.id })
        })
        .catch(res.status(500))
    }
    main().catch(err=>console.log(err))

})

module.exports = router;