import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSensors } from '../../actions/sensors.action';
import ComponentList from '../../components/ComponentList';
import SensorStatus from '../../components/Sensor/SensorStatus';
import './dashboard.css';

class Dashboard extends Component {
  static propTypes = {
    sensors: React.PropTypes.object.isRequired,
    fetchSensors: React.PropTypes.func.isRequired
  };

  render() {
    const sensorCollection = this.props.sensors.collection;
    const isLoading = this.props.sensors.isFetching;

    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>Dashboard</h1>

          <div className="row">
            <div className="col-sm-6">
              <h2>Sensors</h2>
              <ComponentList Component={SensorStatus} componentPluralName="sensors" collection={sensorCollection} isLoading={isLoading} />
            </div>

            <div className="col-sm-6">
              <h2>Monitors</h2>
              {/* Misusing `Sensors` here until we have a `Monitor` component and an actual list */}
              <ComponentList Component={SensorStatus} componentPluralName="monitors" collection={[]} />
            </div>
          </div>
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
  return bindActionCreators({fetchSensors}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
