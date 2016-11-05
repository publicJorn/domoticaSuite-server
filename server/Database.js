const path = require('path');
const uuid = require('uuid'); // TODO: temp
const Datastore = require('nedb');

// TODO: refactor to base Database class and extend to sensor and other classes
module.exports = class {
  constructor () {
    this.db = {};
    this.db.sensors = new Datastore({
      filename: path.resolve(__dirname, '../db/dev-sensors.db'),
      autoload: true
    });
  }

  insert (type, data) {
    return new Promise((resolve, reject) => {
      let parsedData;

      switch (type) {
        case 'sensors':
          parsedData = this.parseSensorData(data);
          break;

        default:
          break;
      }

      if (!parsedData) {
        reject('Required params not set');
        return;
      }

      this.db[type].insert(parsedData, function (error, sensors) {
        if (error)
          reject(error);
        else
          resolve(sensors);
      });
    });
  }

  find (type) {
    return new Promise((resolve, reject) => {
      this.db[type].find({}).sort({room: 1}).exec((error, sensors) => {
        if (error)
          reject(error);
        else
          resolve(sensors);
      });
    });
  }

  parseSensorData (data) {
    // TODO: some proper error checking
    const {room} = data;
    return {arduinoId: uuid.v4(), status: 'ok', room};
  }
};



// TODO:
// db.persistence.compactDatafile();
// -> compaction.done

