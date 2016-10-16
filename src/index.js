import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute} from 'react-router';

// History...
import {browserHistory as history} from 'react-router';
// import {hashHistory as history} from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import configureStore from './store/configureStore';

import App from './containers/app/App';
import Dashboard from './containers/dashboard/Dashboard';
import NotFound from './containers/misc/NotFound';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}/>
        {/* TODO: Just a reminder: check react-redux-starter-kit again
        <Route component={RestrictPage}>
          <Route path="/dashboard" component={Dashboard}/>
        </Route>
        */}
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
