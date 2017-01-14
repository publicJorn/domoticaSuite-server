import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { sensors } from '../reducers/sensors.reducer';

const rootReducer = combineReducers({
  sensors
});

export default function configureStore() {
  return createStore(rootReducer, {}, compose(
    applyMiddleware(thunk),
    (process.env.NODE_ENV === 'development' && window.devToolsExtension) ? window.devToolsExtension() : f => f
  ));
}
