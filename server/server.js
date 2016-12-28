const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const SensorDatabase = require('./SensorDatabase');
const SensorApi = require('./SensorApi');

const production = process.env.NODE_ENV === 'production';
const expressPort = process.env.EXPRESS_PORT || (production) ? 80 : 3001;

// Initialize logging
const logger = require('../src/utils/loggerFactory')();

// Configure app to use bodyParser to parse json data
// TODO: This was copied from boilerplate; Do we need it?
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Synchronous page load requests serve the Domotica server client application
const buildDir = path.resolve(__dirname, '../build');
app.get('/', serveApp);
app.get('/dashboard', serveApp);
app.get('/sensors(/*)?', serveApp);

const io = socket(server);
const sDB = new SensorDatabase();

// API for everything sensor related
const sApi = new SensorApi(app, io, sDB);


// Testing routes
if (!production) {
  require('../test/mockDevice')(app);
}

// Use front-end app's 404 flow for remaining requests
app.get('*', serveApp); // -> This will also intercept statically served files, so they won't be served :(  TODO: double check

// Start the server
server.listen(expressPort);
logger.info('Server started, listening on port ' + expressPort);


function serveApp (req, res) {
  app.use('/static', express.static(buildDir +'/static'));

  res.sendFile(`${buildDir}/index.html`, (err) => {
    if (err) {
      logger.error(`${err}\n\n-----------> Make sure you have run: \`npm run build\``);
      res.status(err.status).end();
    }
  });
}
