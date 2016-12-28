const path = require('path');
const Datastore = require('nedb');
const logger = require('../src/utils/loggerFactory')();

// TODO: to Sensor class
const STATUS_IDENTIFY = 'identifying';

module.exports = class {
  constructor () {
    this.db = new Datastore({
      filename: path.resolve(__dirname, '../db/dev-sensors.db'),
      autoload: true
    });
  }

  /**
   * A sensor is always initially inserted after a sensor is first applying itself to the server
   * It gets final after an admin approves it
   * @param data
   * @returns {Promise}
   */
  insert (data) {
    return new Promise((resolve, reject) => {
      const parsedData = this.parseSensorData(data);

      if (!parsedData) {
        reject('Required params not set');
        return;
      }

      this.db.insert(parsedData, function (err, sensor) {
        logger.debug(`Sensor ${parsedData.arduinoId} inserted in DB`);
        err ? reject(err) : resolve(sensor);
      });
    });
  }

  toggleAlert (alertOn, data) {
    return new Promise((resolve, reject) => {
      this.db.update(
        {arduinoId: data.arduinoId},
        {$set: {status: data.status}},
        {returnUpdatedDocs: true},
        (err, numRepl, updated) => {
          err ? reject(err) : resolve(updated);
        }
      );
    });
  }

  // TODO
  update (data) {
    // this.db.update({arduinoId: data.arduinoId}, data, options, callback)
  }

  /**
   * @param {int} arduinoId
   * @returns {Promise}
   */
  findById (arduinoId) {
    return new Promise((resolve, reject) => {
      this.db.findOne({arduinoId}, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  }

  findAll () {
    return new Promise((resolve, reject) => {
      this.db.find({}).sort({name: 1}).exec((err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
  }

  /**
   * Set default values or use the ones passed
   * @param data
   * @returns {object} Sensor save object
   */
  parseSensorData (data) {
    const {arduinoId, name = '', status = STATUS_IDENTIFY} = data;

    if (!arduinoId) return false;
    return {arduinoId, name, status};
  }
};



// TODO: every night or so, to prune data
// db.persistence.compactDatafile();
// -> compaction.done

