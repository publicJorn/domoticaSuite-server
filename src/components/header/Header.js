import React, { Component/*, PropTypes*/ } from 'react';
import { Link/*, IndexLink*/ } from 'react-router';

import './header.css';

export default class Header extends Component {
  render () {
    return (
      <div className="app-header">
        <Link to="dashboard">Dashboard</Link>&nbsp;
        <Link to="testsuite">Test Suite</Link>
      </div>
    );
  }
}
