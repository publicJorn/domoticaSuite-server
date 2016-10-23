import React, { Component } from 'react';
import Sensor from './Sensor';

export default class ActivityMonitor extends Component {
  static propTypes = {
    sensors: React.PropTypes.array
  }

  render () {
    return (
      <div className="row">
        <h2 className="col-xs-12">Activity monitor</h2>

        <div className="col-sm-6">
          <h3>Sensors</h3>
          <ul>
            {this.props.sensors.map((data, i) =>
              <li key={i}><Sensor {...data} /></li>
            )}
            {!this.props.sensors.length ?
                <li>No sensors</li> : ''}
          </ul>
        </div>

        <div className="col-sm-6">
          <h3>Monitors</h3>
          <p>Todo...</p>
        </div>
      </div>
    );
  }
}
