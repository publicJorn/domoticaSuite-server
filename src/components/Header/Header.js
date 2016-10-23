import React, { Component } from 'react';
import { Link } from 'react-router';

import './header.css';

export default class Header extends Component {
  render () {
    return (
      <div className="row app-header">
        <div className="col-xs-12">
          <Link to="dashboard">Dashboard</Link>&nbsp;
          <Link to="testsuite">Test Suite</Link>
        </div>
      </div>
    );
  }
}
