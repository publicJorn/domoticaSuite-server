import {
  REQUEST_SENSORS,
  RECEIVE_SENSORS,
  UPDATE_SENSOR,
  SENSOR_SAVED
} from '../actions/sensors.action';
import initialState from '../store/stateDesign';

/**
 * Manage a single sensor
 * @param {object} state
 * @param {object} action
 */
// function sensor (state, action) {
//   switch (action.type) {
//     case ADD_SENSOR:
//       const {_id, arduinoId, name, status} = action;
//
//       return {
//         _id,
//         arduinoId,
//         name,
//         status
//       };
//
//     default:
//       return state;
//   }
// }

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

    case UPDATE_SENSOR:
      const { key, value, _id } = action.data;

      const collection = sensorsState.collection.map((sensor) => {
        if (sensor._id === _id) {
          sensor[key] = value;
        }
        return sensor;
      });

      const newState = Object.assign({}, sensorsState, {
        isSaving: true,
        collection: collection
      });

      return newState;

    case SENSOR_SAVED:
      return Object.assign({}, sensorsState, {
        isSaving: true,
      });

    default:
      return sensorsState;
  }
}
