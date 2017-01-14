import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { fetchSensors, saveSensor } from '../../actions/sensors.action';
import ComponentList from '../../components/ComponentList';
import SensorStatus from '../../components/Sensor/SensorStatus';
import Arduino from '../../components/Sensor/Arduino';
import AddSensorForm from './AddSensorForm';
import './sensors.css';

class TestSuite extends Component {
  static propTypes = {
    routeParams: React.PropTypes.object,
    sensors: React.PropTypes.object.isRequired,
    fetchSensors: React.PropTypes.func.isRequired,
    saveSensor: React.PropTypes.func.isRequired
  };

  parseSelectedSensor (collection) {
    const sensor = collection.filter((sensor) => sensor._id === this.props.routeParams.id)[0];

    if (sensor) {
      return <Arduino sensor={sensor} />;
    } else {
      return <p>Choose a sensor from the list</p>;
    }
  }

  render () {
    const {sensors, saveSensor} = this.props;
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

          <hr />

          {/* TODO: implement form in list (or anything more fancy than this...) */}
          <AddSensorForm saveSensor={saveSensor} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    sensors: state.sensors
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchSensors, saveSensor}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TestSuite);
