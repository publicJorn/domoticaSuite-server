import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import ActivityMonitor from '../../components/ActivityMonitor/ActivityMonitor';
import { fetchSensors, saveSensor } from '../../actions/sensors.action';
import AddSensorForm from './AddSensorForm';

class TestSuite extends Component {
  static propTypes = {
    sensors: React.PropTypes.object,
    fetchSensors: React.PropTypes.func,
    saveSensor: React.PropTypes.func
  };

  componentDidMount () {
    this.props.fetchSensors();
  }

  render () {
    const {sensors, saveSensor} = this.props;

    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>Testsuite</h1>
          <ActivityMonitor sensors={sensors} />
          <hr />
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
