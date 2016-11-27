const logger = require('../src/utils/loggerFactory')();

module.exports = class {
  /**
   * @param {object} db    Database file
   * @param {string} store Datastore instance
   */
  constructor (db, store) {
    this.db = db;
    this.store = store;
  }

  insert (req, res) {
    this.db.insert(this.store, req.params)
      .then((data) => {
        logger.info(`"${data.name}" added to ${this.store}`);
        res.status(200).send({ok: true, data});
      })
      .catch((error) => {
        logger.warn(`Can't insert: ${error}`);
        res.status(200).send({ok: false, error});
      });
  }

  find (req, res) {
    this.db.findAll(this.store)
      .then((data) => res.status(200).send({ok: true, data}))
      .catch((error) => {
        logger.warn(`Can't find: ${error}`);
        res.status(200).send({ok: false, error});
      });
  }
};
