const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./Database');
const Api = require('./Api');

// Configure app to use bodyParser to parse json data
const production = process.env.NODE_ENV === 'production';
const port = 3001;
const app = express();
const server = http.createServer(app);  
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Websockets!
// const io = require('socket.io')(server);

// API
const db = new Database();
const sensorApi = new Api(db, 'sensors');
app.get('/create-sensor/:name', (req, res) => sensorApi.insert(req, res));
app.get('/sensors', (req, res) => sensorApi.find(req, res));

// Catch initial page load requests
const buildDir = path.resolve(__dirname, '../build');
app.get('/', serveApp);
app.get('/dashboard', serveApp);
app.get('/testsuite', serveApp);

// Only for dev testing
const testDir = path.resolve(__dirname, '../test/ui');
if (!production) {
  app.use('/static', express.static(testDir));
  app.get('/static/socket.io.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../node_modules/socket.io-client/socket.io.js'), err => console.error(err));
  });
  app.get('/mock/:device', mockDevice);
}

// Use front-end app's 404 flow
// app.get('*', serveApp); // -> This will also intercept statically served files, so they won't be served :(

// Start the server
server.listen(port);
console.log('Server is listening on port ' + port);



function serveApp (req, res) {
  app.use('/static', express.static(buildDir +'/static'));

  res.sendFile(`${buildDir}/index.html`, (err) => {
    if (err) {
      console.error(err);
      console.log('-----------> Make sure you have run: `npm run build`');
      res.status(err.status).end();
    }
  });
}

function mockDevice (req, res) {
  const device = req.params.device;

  res.sendFile(`${testDir}/${device}.html`, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    }
  });
}
