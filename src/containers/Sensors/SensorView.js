import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  fetchSensors,
  setupSaveSensor,
  saveSensor
} from '../../actions/sensors.action';
import ComponentList from '../../components/ComponentList';
import SensorStatus from '../../components/Sensor/SensorStatus';
import Arduino from '../../components/Sensor/Arduino';
import './sensors.css';

class TestSuite extends Component {
  static propTypes = {
    routeParams: React.PropTypes.object,
    sensors: React.PropTypes.object.isRequired,
    fetchSensors: React.PropTypes.func.isRequired,
    saveSensor: React.PropTypes.func.isRequired
  };

  render () {
    const {sensors} = this.props;
    const selectedSensor = this.parseSelectedSensor(sensors.collection);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>Sensors</h1>

          <div className="row">
            <div className="col-sm-6">
              <ComponentList
                Component={SensorStatus}
                componentPluralName="sensors"
                collection={sensors.collection}
                className="asset-tabs" />
            </div>

            <div className="col-sm-6">
              {selectedSensor}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Print the sensor details and normalise onChange event data and add id
   * -- I could have used redux-forms, but I wanted to know how it works, so I'm taking the long route :)
   */
  parseSelectedSensor (collection) {
    const sensor = collection.filter((sensor) => sensor._id === this.props.routeParams.id)[0];

    const saveSensorWrapper = (evt) => {
      const { name, value } = evt.target;
      this.props.saveSensor({key: name, value, _id: sensor._id});
    };

    if (sensor) {
      return <Arduino sensor={sensor} saveSensor={saveSensorWrapper} />;
    } else {
      return <p>Choose a sensor from the list</p>;
    }
  }
}


const mapStateToProps = (state) => {
  return {
    sensors: state.sensors
  };
};

const mapDispatchToProps = (dispatch) => {
  setupSaveSensor(dispatch);
  return bindActionCreators({fetchSensors, saveSensor}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TestSuite);
