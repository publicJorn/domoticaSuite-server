import { debounce } from 'lodash';
import * as sensorsService from '../services/sensors.service';

export const REQUEST_SENSORS = 'REQUEST_SENSORS';
export const RECEIVE_SENSORS = 'RECEIVE_SENSORS';
export const UPDATE_SENSOR = 'UPDATE_SENSOR';
export const SENSOR_SAVED = 'SENSOR_SAVED';
export const SENSOR_ALERT = 'SENSOR_ALERT';

/**
 * Not used atm; keeping as fallback when websockets are not supported
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

export function sensorAlert (data) {
  return {
    type: SENSOR_ALERT,
    data
  };
}

/**
 * Save flow ===>
 * Create a debounced save function, so not every keystroke triggers an actual save to server
 */
let debouncedSensorSave = null;

export function setupSaveSensor (dispatch) {
  // Make sure it only sets up once
  if (debouncedSensorSave === null) {
    debouncedSensorSave = debounce((data) => saveSensorState(dispatch, data), 200);
  }
}

/**
 * Here we trigger an immediate store update (local, client side) and a call to the debounced "server save" function
 */
export function saveSensor (data) {
  return (dispatch) => {
    dispatch(updateSensorState(data));
    debouncedSensorSave(data);
  };
}

export function updateSensorState (data) {
  return {
    type: UPDATE_SENSOR,
    data
  };
}

/**
 * Save on the server
 * Note: this function would be abstracted out by a Saga
 */
export function saveSensorState (dispatch, data) {
  sensorsService.save(data, (success) => dispatch(sensorSaved(success)));
}

export function sensorSaved (success) {
  return {
    type: SENSOR_SAVED,
    success
  };
}

