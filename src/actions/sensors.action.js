import * as sensorsService from '../services/sensors.service';

export const REQUEST_SENSORS = 'REQUEST_SENSORS';
export const RECEIVE_SENSORS = 'RECEIVE_SENSORS';
export const SAVING_SENSOR = 'SAVING_SENSOR';
export const ADD_SENSOR = 'ADD_SENSOR';
export const SENSOR_ALERT = 'SENSOR_ALERT';

/**
 * Not used atm; keeping for now in case sockets don't work
 */
export function fetchSensors () {
  return (dispatch) => {
    dispatch(requestSensors());

    return sensorsService.retrieve().then((sensorFetch) => {
      // TODO: handle `ok == false`
      if (sensorFetch.ok) {
        dispatch(receiveSensors(sensorFetch.data));
      }
    });
  };
}

export function requestSensors () {
  console.info('requestSensors');
  return {
    type: REQUEST_SENSORS
  };
}

export function receiveSensors (sensors) {
  console.info('receiveSensors', sensors);
  return {
    type: RECEIVE_SENSORS,
    sensors
  };
}

export function sensorAlert (data) {
  return {
    type: SENSOR_ALERT,
    data
  };
}

// Save flow ---
export function saveSensor (formData) {
  return function (dispatch) {
    dispatch(savingSensor(formData));

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
