import uuid from 'uuid';
import testAsyncFetchSensors from './testAsyncFetchSensors';

export const REQUEST_SENSORS = 'REQUEST_SENSORS';
export const RECEIVE_SENSORS = 'RECEIVE_SENSORS';
export const ADD_SENSOR = 'ADD_SENSOR';

export function fetchSensors () {
  return function (dispatch) {
    requestSensors();
    return testAsyncFetchSensors().then(sensors => dispatch(receiveSensors(sensors)));
  };
}

export function requestSensors () {
  return {
    type: REQUEST_SENSORS
  };
}

export function receiveSensors (sensors) {
  return {
    type: RECEIVE_SENSORS,
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
