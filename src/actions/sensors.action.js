import * as sensorsService from '../services/sensors.service';

export const REQUEST_SENSORS = 'REQUEST_SENSORS';
export const RECEIVE_SENSORS = 'RECEIVE_SENSORS';
export const SAVING_SENSOR = 'SAVING_SENSOR';
export const ADD_SENSOR = 'ADD_SENSOR';

// Fetch flow ---
export function fetchSensors () {
  return function (dispatch) {
    requestSensors();

    return sensorsService.retrieve().then((sensorFetch) => {
      // TODO: handle `ok == false`
      if (sensorFetch.ok) {
        dispatch(receiveSensors(sensorFetch.data));
      }
    });
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

// Save flow ---
export function saveSensor (formData) {
  return function (dispatch) {
    savingSensor(formData);

    return sensorsService.save(formData).then((result) => {
      if (result.ok) {
        dispatch(addSensor(result.data));
      }
    });
  };
}

export function savingSensor (formData) {
  console.log('TODO: loader via reducer...', formData);
  return {
    type: SAVING_SENSOR
  };
}

export function addSensor (sensorData) {
  return {
    type: ADD_SENSOR,
    ...sensorData
  };
}
