const express = require('express')
const app = express()
const port = 80
const fs = require('fs')
var cors = require('cors')
app.use(cors())

const http = require('http');
const https = require('https');
// const express = require('express');

'use strict';
const excelToJson = require('convert-excel-to-json');

// app.use(bodyParser.json());
app.use(express.static(process.cwd()+"../../Frontend/mbuportal1/dist/argon-design-system-angular"));
const result = excelToJson({
    sourceFile: '../Excelfiles/Accelerator.xlsx',
    // range: 'A1:H3',
    
    columnToKey: {
      A: 'slno',
      B: 'subscriptionname',
      C: 'acceleratorip',
      D: 'createdon',
      E: 'Comments'
  }

});
 

console.log(result)

//csv parser
headers: true
const csv = require('csv-parser')
const resultscsv = [];
fs.createReadStream('../Excelfiles/azuresubscriptionscsv.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => resultscsv.push(data))
  .on('end', () => {
  });
app.get('/getjsonvaluesofexcel', (req, res) => {
  res.json(result);
});
//ending of csv parser api



// Certificate
const privateKey = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const ca = fs.readFileSync('fullchain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
//server code ending


app.get('/', (req, res) => {
    res.sendFile(process.cwd()+"../../Frontend/mbuportal1/dist/argon-design-system-angular/index.html")
});

app.get('/getjsonvaluesofexcel', (req, res) => {
  res.json(result);
  console.log(result);
});

app.get('/getjsonvaluesofcsv', (req, res) => {
    res.json(resultscsv);
    console.log(resultscsv);
  });
  

// app.listen(port, () => {
//     console.log(`app listening at http://localhost:${port}`)
//   });

  