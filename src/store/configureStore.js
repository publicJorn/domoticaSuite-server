import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { sensors } from '../reducers/sensors.reducer';

const rootReducer = combineReducers({
  sensors
});

const initialState = {};

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
