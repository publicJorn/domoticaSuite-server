// TODO: figure out a good dev/prod way to set (base) url
import io from 'socket.io-client';
import {
  requestSensors,
  receiveSensors,
  sensorAlert
} from '../actions/sensors.action';

let socket;

export default function bindSensorSocketToActions () {
  return (dispatch) => {
    dispatch(requestSensors());

    socket = io.connect('/io/sensor'); // Non-matched route goes to http://localhost:3001

    socket.on('connected', () => {
      socket.emit('identify', {type: 'monitor'});
    });

    socket.on('sensorlist', (sensors) => dispatch(receiveSensors(sensors)));
    socket.on('alert',      (sensor)  => dispatch(sensorAlert(sensor)));
  };
}

export function save (data, cb) {
  socket.emit('save', data, cb);
}
