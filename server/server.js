const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const Database = require('./Database');
const port = 3001;

const db = new Database();

// Configure app to use bodyParser to parse json data
const app = express(); 
const server = http.createServer(app);  
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Websockets!
// const io = require('socket.io')(server);


// TODO: any API stuff here
app.get('/create-sensor/:name', (req, res) => {
  db.insert('sensors', req.params)
    .then((data) => {
      console.log(`Sensor "${data.name}" added.`);
      res.status(200).send({ok: true, data});
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
      res.status(200).send({ok: false, error});
    });
});

app.get('/sensors', (req, res) => {
  db.find('sensors')
    .then((data) => res.status(200).send({ok: true, data}))
    .catch((error) => {
      console.log(`ERROR: ${error}`);
      res.status(200).send({ok: false, error});
    });
});

// Catch initial page load requests
app.get('/', serveApp);
app.get('/dashboard', serveApp);
app.get('/testsuite', serveApp);

function serveApp (req, res) {
  const buildDir = path.resolve(__dirname, '../build');
  app.use(express.static('../build'));

  res.sendFile(`${buildDir}/index.html`, function (err) {
    if (err) {
      console.log(err);
      console.log('-----------> Make sure you have run: `npm run build`');
      res.status(err.status).end();
    }
  });
}

// Start the server
server.listen(port);
console.log('Server is listening on port ' + port);
