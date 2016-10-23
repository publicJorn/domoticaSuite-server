import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { sensors } from '../reducers/sensors';

const rootReducer = combineReducers(
  {
    sensors
  }
);

const initialState = {
  // sensors: [
  //   {id: 'aaaaa-1-bbbbb', room: '001', status: 'ok'}
  // ]
};

export default function configureStore() {
  let store;

  if (process.env.NODE_ENV === 'development') {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunk), f=>f
    ));
  }

  return store;
}
