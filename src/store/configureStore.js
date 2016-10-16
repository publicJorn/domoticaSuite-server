import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import auth from '../reducers/auth';
// import alerts from '../reducers/alerts';
import { noop } from '../reducers/noop';

const rootReducer = combineReducers(
  {
    noop
  }
);

const initialState = {};

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware), f=>f
    ));
  }

  return store;
}
