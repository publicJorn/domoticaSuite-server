import React, { Component } from 'react';
import ComponentList from './ComponentList';
import Sensor from '../Assets/Sensor';

export default class ActivityMonitor extends Component {
  static propTypes = {
    sensors: React.PropTypes.object
  }

  render () {
    const sensorCollection = this.props.sensors.collection;

    return (
      <div className="row">
        <h2 className="col-xs-12">Activity monitor</h2>

        <div className="col-sm-6">
          <ComponentList Component={Sensor} componentPluralName="sensors" collection={sensorCollection} />
        </div>

        <div className="col-sm-6">
          {/* Misusing `Sensors` here until we have a `Monitor` component */}
          <ComponentList Component={Sensor} componentPluralName="monitors" collection={[]} />
        </div>
      </div>
    );
  }
}
