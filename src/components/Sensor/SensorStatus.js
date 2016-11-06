import React, { Component } from 'react';
import { Link } from 'react-router';
import './sensor-status.css';

export default class SensorStatus extends Component {
  static propTypes = {
    _id: React.PropTypes.string.isRequired,
    arduinoId: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired
  }

  render () {
    const {_id, arduinoId, name, status} = this.props;
    const url = `/sensors/${_id}`;

    return (
      <div className="sensor-status" data-arduino-id={arduinoId}>
        <Link to={url} className="sensor-status__link">
          <span className="sensor-status__name">{name}</span>
          {/* <span className="sensor-status__text"> is </span> */}
          <span className={`sensor-status__status sensor-status__status--${status}`}>{status}</span>
        </Link>
      </div>
    );
  }
}
