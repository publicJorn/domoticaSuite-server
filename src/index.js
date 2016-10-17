import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRedirect,
  browserHistory as history
} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './containers/app/App';
import Dashboard from './containers/dashboard/Dashboard';
import TestSuite from './containers/testsuite/TestSuite';
import NotFound from './containers/misc/NotFound';

import configureStore from './store/configureStore';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        // TODO: temp -hide behind login
        <IndexRedirect to="/dashboard" />

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/testsuite" component={TestSuite} />
        {/* TODO: Just a reminder: check react-redux-starter-kit again
        <Route component={RestrictPage}>
          <Route path="/dashboard" component={Dashboard} />
        </Route>
        */}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
