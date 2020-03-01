const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

/////////////////////////////////////////////////////////////////////////////////////////////////
/// THIS MODULE AIM TO CONVERT THE MASTER SPREADSHEET IN A JSON USED FOR SIMULATOR INITIAL RENDER
/////////////////////////////////////////////////////////////////////////////////////////////////

///////////////
/////PARAMETERS
///////////////

const idSpreadsheetData = "1hTStN2sBi-tpAaKFvcoXrMgfS60SSqugP6M09KrFPKk"
var resultsRange = 'Résultats!A1:BB150'



// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
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
// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error while trying to retrieve access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }  

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1x64Flw5lHpcIHu5xGwU9v1uSK-MrB1rgCmoEynjdacc/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
 
function main(auth) {
    
    const sheets = google.sheets({version: 'v4', auth});
    
    //DONNEES SORTIES
    sheets.spreadsheets.values.get({
    spreadsheetId: idSpreadsheetData,
    range: resultsRange,
    }, (err, res) => {

        var rows = res.data.values;

        var i=81
        var j=0
        var datas = []

        function formatNombre(nb) {
            var number = Number(nb.toString().replace(",", "."))
            return number
        }
    
        
        let w = i

        let numberOfParameters = 0;
    
        while (rows[w].length) {
          numberOfParameters += 1
          // console.log(numberOfParameters)
          w +=1
        }
    
    
    
        function createObjectForEachSector() {
            for (x =0; x < numberOfParameters; x ++){
                datas.push(
                    [{
                        "name": rows[i+x][j+2],
                        "id": "MGT de CO2",
                        "ranges":[
                            formatNombre(rows[i+x][j+5]),
                            formatNombre(rows[i+x][j+6]),
                            formatNombre(rows[i+x][j+4])
                        ],
                        "measures":[
                            formatNombre(rows[i+x][3])
                        ],
                        "markers":[
                            formatNombre(rows[i+x][5]),
                            formatNombre(rows[i+x][6])
                        ]
                    }]
                )
            }
        }
    
        createObjectForEachSector()
    
        // console.log(datas)
    
    });

}
