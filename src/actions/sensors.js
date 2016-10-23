import uuid from 'uuid';
import testAsyncFetchSensors from './testAsyncFetchSensors';

export const GET_SENSORS = 'GET_SENSORS';
export const SHOW_SENSORS = 'SHOW_SENSORS';
export const ADD_SENSOR = 'ADD_SENSOR';

export function getSensors () {
  return function (dispatch) {
    return testAsyncFetchSensors().then(
      sensors => {
        dispatch(showSensors(sensors));
      }
    );
  };
}

export function showSensors (sensors) {
  return {
    type: SHOW_SENSORS,
    sensors
  };
}

export function addSensor (sensorData) {
  const id = uuid.v4();

  return {
    type: ADD_SENSOR,
    id: id,
    ...sensorData
  };
}
