import React, { Component } from 'react';
import { Link } from 'react-router';

import './header.css';

export default class Header extends Component {
  render () {
    return (
      <header className="row app-header">
        <div className="col-xs-12">
          <Link to="/dashboard">Dashboard</Link>&nbsp;|&nbsp;
          <Link to="/sensors">Sensors</Link>
        </div>
      </header>
    );
  }
}
