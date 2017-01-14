// A whole empty state object (not deep)
export default {
  sensors: {
    isFetching: false,
    collection: [] // sensor
  }
};

export const sensor = {
  _ui      : '', // db-generated id
  arduinoId: '', // arduino-generated id
  name     : '', // user input
  status   : ''  // ok | alert | error
};
