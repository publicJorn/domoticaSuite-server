// TODO: figure out a good dev/prod way to set (base) url
import io from 'socket.io-client';
import axios from 'axios';
import { requestSensors, receiveSensors, sensorAlert } from '../actions/sensors.action';

export default function bindSensorSocketToActions () {
  return (dispatch) => {
    dispatch(requestSensors());

    const socket = io.connect('/io/sensor'); // Non-matched route goes to http://localhost:3001

    socket.on('connected', () => {
      socket.emit('identify', {type: 'monitor'});
    });

    socket.on('sensorlist', (sensors) => dispatch(receiveSensors(sensors)));
    socket.on('alert',      (sensor)  => dispatch(sensorAlert(sensor)));
  };
}

export function retrieve () {
  try {
    return axios.get('/api/sensors').then((resp) => resp.data);
  } catch (err) {
    console.error(err);
  }
}

export function save (data) {
  const {name} = data;

  try {
    return fetch(`/api/sensor/create/${name}`).then((resp) => resp.json());
  } catch (err) {
    console.error(err);
  }
}

import uuid from 'uuid';
export function testFetch () {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve([
        {arduinoId: uuid.v4(), name: 'Kamer 001', status: 'ok'},
        {arduinoId: uuid.v4(), name: 'Kamer 002', status: 'ok'},
        {arduinoId: uuid.v4(), name: 'Kamer 003', status: 'ok'}
      ]);
    }, 1000);
  });
}
