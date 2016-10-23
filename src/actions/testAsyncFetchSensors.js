import uuid from 'uuid';

export default function testAsyncFetchSensors () {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve([
        {id: uuid.v4(), room: '001', status: 'ok'},
        {id: uuid.v4(), room: '002', status: 'ok'},
        {id: uuid.v4(), room: '003', status: 'ok'}
      ]);
    }, 1000);
  });
}