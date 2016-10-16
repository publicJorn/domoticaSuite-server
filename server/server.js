/** 
 * This is a simple express server, to show basic authentication services (login and logout requests)
 * based JWT, and basic socket.io.
 * 
 * Once a user is authenticated, a jwt token will be returned as response to the client. 
 * It's expected the jwt token will be included in the subsequent client requests. The server
 * can then protect the services by verifying the jwt token in the subsequent API requests.
 * 
 * The server will also broadcast the login/logout events to connected clients via socket.io.
 * 
 */
var path = require('path');
var express = require('express');
// var bodyParser = require('body-parser');
var port = 3001;

// Configure app to use bodyParser to parse json data
var app = express(); 
var server = require('http').createServer(app);  
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Websockets!
// var io = require('socket.io')(server);


// TODO: any API stuff here


// Catch initial page load requests
app.get('*', function(req, res) {
  var buildDir = path.resolve(__dirname, '../build');
  app.use(express.static('../build'));
  res.sendFile(`${buildDir}/index.html`, function (err) {
    if (err) {
      console.log(err);
      console.log('-----------> Are you sure frontend is built?');
      res.status(err.status).end();
    }
  });
});


// Start the server
server.listen(port);
console.log('Server is listening on port ' + port);
