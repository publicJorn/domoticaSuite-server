// TODO: figure out a good dev/prod way to set (base) url

export function retrieve () {
  try {
    return fetch('/sensors').then((resp) => resp.json());
  } catch (err) {
    console.error(err);
  }
}

export function save (data) {
  const {name} = data;

  try {
    return fetch(`/create-sensor/${name}`).then((resp) => resp.json());
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
