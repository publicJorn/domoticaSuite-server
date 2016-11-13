const path = require('path');
const express = require('express');

const testDir = path.resolve(__dirname, './ui');

/**
 * Define routes for the mock tests
 * Is exported function
 * @param app
 */
const routings = (app) => {
  app.use('/static', express.static(testDir +'/static'));

  app.get('/static/socket.io.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../node_modules/socket.io-client/socket.io.js'), err => {
      if (err) console.error(err);
    });
  });

  app.get('/mock/:device', mockDevice);
};


function mockDevice (req, res) {
  const device = req.params.device;

  res.sendFile(`${testDir}/${device}.html`, (err) => {
    if (err) {
      console.error('ERROR: '+ err);
      res.status(err.status).end();
    }
  });
}

module.exports = routings;
