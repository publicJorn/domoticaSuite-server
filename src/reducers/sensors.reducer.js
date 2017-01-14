import { REQUEST_SENSORS, RECEIVE_SENSORS, SAVING_SENSOR, ADD_SENSOR } from '../actions/sensors.action';
import initialState from '../store/stateDesign';

/**
 * Manage a single sensor
 * @param {object} state
 * @param {object} action
 */
function sensor (state, action) {
  switch (action.type) {
    case ADD_SENSOR:
      const {_id, arduinoId, name, status} = action;

      return {
        _id,
        arduinoId,
        name,
        status
      };

    default:
      return state;
  }
}

/**
 * Manage the list of sensors
 * @param {object} sensorsState `state.sensors` property
 * @param {object} action
 * @returns {object} sensor collection
 */
export function sensors (sensorsState = initialState.sensors, action) {
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

    case SAVING_SENSOR:
      return Object.assign({}, sensorsState, {
        isSaving: true
      });

    case ADD_SENSOR:
      return Object.assign({}, sensorsState, {
        isSaving: false,
        collection: [...sensorsState.collection, sensor(undefined, action)]
      });

    default:
      return sensorsState;
  }
}
