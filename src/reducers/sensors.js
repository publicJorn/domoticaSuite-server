import { REQUEST_SENSORS, RECEIVE_SENSORS, ADD_SENSOR } from '../actions/sensors';

/**
 * Manage a single sensor
 * @param {object} state
 * @param {object} action
 */
function sensor (state, action) {
  switch (action.type) {
    case ADD_SENSOR:
      return {
        id: action.id,
        room: action.room,
        status: 'ok'
      };

    default:
      return state;
  }
}

const defaultSensorState = {
  isFetching: false,
  collection: []
};

/**
 * Manage the list of sensors
 * @param {object} sensorsState `state.sensors` property
 * @param {object} action
 * @returns {object} sensor collection
 */
export function sensors (sensorsState = defaultSensorState, action) {
  switch (action.type) {
    case REQUEST_SENSORS:
      return Object.assign({}, sensorsState, {
        isFetching: true
      });

    case RECEIVE_SENSORS:
      return Object.assign({}, sensorsState, {
        isFetching: false,
        collection: action.sensors
      });

    case ADD_SENSOR:
      return Object.assign({}, sensorsState, {
        collection: [...sensorsState.collection, sensor(undefined, action)]
      });

    default:
      return sensorsState;
  }
}
