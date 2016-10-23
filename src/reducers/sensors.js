import { GET_SENSORS, SHOW_SENSORS, ADD_SENSOR } from '../actions/sensors';

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

/**
 * Manage the list of sensors
 * @param {object} state
 * @param {object} action
 * @returns {object} sensor collection
 */
export function sensors (state = [], action) {
  switch (action.type) {
    case GET_SENSORS:
      return state;

    case SHOW_SENSORS:
      return action.sensors;

    case ADD_SENSOR:
      return [...state, sensor(undefined, action)];

    default:
      return state;
  }
}
