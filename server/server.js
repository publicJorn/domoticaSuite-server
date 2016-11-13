const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./Database');
const Api = require('./Api');

const production = process.env.NODE_ENV === 'production';
const expressPort = process.env.EXPRESS_PORT || (production) ? 80 : 3001;

// Configure app to use bodyParser to parse json data
// TODO: This was copied from boilerplate; Do we need it?
const app = express();
const server = http.createServer(app);  
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Initial page load requests serve the Domotica server client application
const buildDir = path.resolve(__dirname, '../build');
app.get('/', serveApp);
app.get('/dashboard', serveApp);
app.get('/sensors(/*)?', serveApp);


// Websocket API for sensors
const io = require('socket.io')(server);
const sensorIo = io.of('/io/sensor');

sensorIo.on('connection', (socket) => {
  console.log('io: connected');
  socket.emit('connected', {msg: 'connected to sensor/io'});
});


// API for server to manage sensors
const db = new Database();
const s2sApi = new Api(db, 'sensors');
app.get('/api/sensor/create/:name', (req, res) => s2sApi.insert(req, res));
app.get('/api/sensors', (req, res) => s2sApi.find(req, res));


// Testing routes
if (!production) {
  require('../test/mockArduino')(app);
}

// Use front-end app's 404 flow for remaining requests
app.get('*', serveApp); // -> This will also intercept statically served files, so they won't be served :(

// Start the server
server.listen(expressPort);
console.log('Server is listening on port ' + expressPort);


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
