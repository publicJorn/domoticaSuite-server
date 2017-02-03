const util = require('util');
const find = require('lodash/find');
const logger = require('../src/utils/loggerFactory')();

// TODO: to Sensor class
const STATUS_IDENTIFY = 'identifying';

/**
 * Handles everything related to connections, both successes and proper handling of failures
 *
 * The idea is:
 * arduino connects to sensorApi
 * client  connects to sensorApi
 * client  connects to monitorApi
 * monitor connects to monitorApi
 *
 *
 * Sensor statuses:
 * - identifying
 * - confirming
 * - registered
 * - ok*     all ok
 * - alert*  sensor is triggered
 * - error*  an error occured, connection based or otherwise
 *
 * * These show the actual sensor status once registered.
 * TODO: Create Sensor class
 */
module.exports = class {
  /**
   * @param app  Express instance
   * @param io   Socket.io instance
   * @param db   Database instance
   */
  constructor (app, io, db) {
    this.app = app;
    this.io = io.of('/io/sensor');
    this.db = db;

    // Used to create a link between clientId and sensor
    this.ioConnections = [];

    this.registerEndpoints();
  }

  registerEndpoints () {
    this.app.get('/api/sensor/create/:name', this.insert.bind(this));
    this.app.get('/api/sensor/approve/:id', this.approve.bind(this));
    this.app.get('/api/sensors', this.find.bind(this));
    this.io.on('connection', this.initSocketConnection.bind(this));
  }

  // Socket API ---

  initSocketConnection (socket) {
    logger.debug(`New connection on sensor namespace: ${socket.client.id}`);

    // TODO: make this a proper class and (maybe) do database operations from it
    let client = {
      clientId: socket.client.id,
      type: '', // sensor | monitor
      data: {}
    };

    this.ioConnections.push(client);
    socket.emit('connected', client);

    // Using this construction to keep `this` pointing to SensorApi and keep socket/connection data as well
    socket.on('identify', (identity) => this.onIdentifyClient(socket, identity));

    // Sensors
    socket.on('alert', this.onAlert.bind(this, socket));
    socket.on('disconnect', this.onDisconnect.bind(this, socket));
    // Monitors (including server interface)
    socket.on('subscribe', (room) => this.joinRoom(socket, room));
    socket.on('save', this.updateSensor.bind(this));
  }

  /**
   *
   * @param socket
   * @param identity {type: '', (id: '' || arduinoId: '')}
   */
  onIdentifyClient (socket, identity) {
    switch (identity.type) {
      case 'sensor':
        this.identifySensor(socket, identity);
        break;

      case 'monitor':
        this.identifyMonitor(socket, identity);
        break;

      default:
        throw('No known type given during identifidation. Identity:\n' + JSON.stringify(identity));
    }
  }

  identifySensor (socket, identity) {
    logger.debug(`Identifying sensor ${identity.arduinoId}`);

    const client = this.findConnectedClientByArduinoId(identity.arduinoId);

    if (client) {
      logger.info(`Received connection request from sensor ${identity.arduinoId}, but is already connected`);
      client.forceDisconnect = true;
      socket.disconnect();
      return;
    }

    this.db.findById(identity.arduinoId)
      .then((storedData) => {
        if (!storedData) {
          logger.debug(`New sensor (${identity.arduinoId}), create DB entry`);
          this.db.insert({
            arduinoId: identity.arduinoId
          });
        }

        // Save stored data on socket instance in connections array
        const client = this.findConnectedClientById(socket.client.id);
        client.type = identity.type;
        client.data = storedData;

        if (storedData.status === STATUS_IDENTIFY) {
          logger.info(`Waiting for admin to confirm sensor with arduinoId: ${identity.arduinoId}`);
          this.emitSensorList();
        } else {
          logger.info(`Registered sensor connected successfully (arduinoId: ${identity.arduinoId})`);
          this.emitSensorList();
        }

        this.debugLogCurrentConnections();
      })
      // TODO: retry # times in timeframe
      .catch((err) => logger.error('Error identifying sensor', {msg: err}));
  }

  identifyMonitor (socket, identity) {
    // TODO: check key/pass
    logger.debug(`Identifying monitor`, identity);

    socket.join('monitors');
    this.emitSensorList();
  }

  emitSensorList () {
    logger.debug('Fetching and emitting sensorlist...');
    this.db.findAll()
      .then((sensors) => this.io.to('monitors').emit('sensorlist', sensors))
      .catch(logger.error);
  }

  onAlert (socket) {
    let sensorData = this.findConnectedClientById(socket.client.id).data;
    logger.info('Sensor triggers alert!', sensorData);

    this.db.toggleAlert(true, sensorData);
    this.io.to('monitors').emit('alert', {sensorData});
  }

  updateSensor (sensorData, ok) {
    logger.info('Update sensor');

    this.db.update(sensorData)
      .then(() => ok(true))
      .catch(() => ok(false));
  }

  onDisconnect (socket) {
    let client = this.findConnectedClientById(socket.client.id);
    let id = this.ioConnections.indexOf(client);

    this.ioConnections.splice(id, 1);

    if (client.type === 'sensor' && !client.forceDisconnect) {
      logger.warn(`Disconnected sensor: ${client.data.arduinoId}`);
      this.io.to('monitors').emit('disconnection', client.data);
    } else {
      logger.info(`Client disconnected`, {client});
    }

    this.debugLogCurrentConnections();
  }

  // Helper function ---

  findConnectedClientById (clientId) {
    return find(this.ioConnections, {clientId});
  }

  findConnectedClientByArduinoId (arduinoId) {
    return this.ioConnections.filter((client) => {
      if (client.data && client.data.arduinoId === arduinoId) return client;
    })[0];
  }

  debugLogCurrentConnections () {
    logger.debug('Current connections::\n', util.inspect(this.ioConnections));
  }

  // Ajax API ---

  insert (req, res) {
    this.db.insert(req.params)
      .then((data) => {
        logger.info(`"${data.name}" added to ${this.store}`);
        res.status(200).send({ok: true, data});
      })
      .catch((error) => {
        logger.warn(`Can't insert: ${error}`);
        res.status(200).send({ok: false, error});
      });
  }

  // TODO
  approve (req, res) {
    logger.info('Approving sensor', req.params);
    // this.db.update(req.params)
    //   .then((data) => {
    //     logger.info(`"${data.name}" added to ${this.store}`);
    //     res.status(200).send({ok: true, data});
    //   })
    //   .catch((error) => {
    //     logger.warn(`Can't insert: ${error}`);
    //     res.status(200).send({ok: false, error});
    //   });
  }

  find (req, res) {
    this.db.findAll()
      .then((data) => res.status(200).send({ok: true, data}))
      .catch((error) => {
        logger.warn(`Can't find: ${error}`);
        res.status(200).send({ok: false, error});
      });
  }
};
