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
        console.log(`"${data.name}" added to ${this.store}`);
        res.status(200).send({ok: true, data});
      })
      .catch((error) => {
        console.error(`ERROR: ${error}`);
        res.status(200).send({ok: false, error});
      });
  }

  find (req, res) {
    this.db.findAll(this.store)
      .then((data) => res.status(200).send({ok: true, data}))
      .catch((error) => {
        console.log(`ERROR: ${error}`);
        res.status(200).send({ok: false, error});
      });
  }
};
