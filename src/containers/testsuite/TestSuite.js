import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import ActivityMonitor from '../../components/ActivityMonitor/ActivityMonitor';
import { getSensors, addSensor } from '../../actions/sensors';
import AddSensorForm from './AddSensorForm';

class TestSuite extends Component {
  static propTypes = {
    sensors: React.PropTypes.array,
    getSensors: React.PropTypes.func,
    addSensor: React.PropTypes.func
  };

  componentDidMount () {
    this.props.getSensors();
  }

  render () {
    const {sensors, addSensor} = this.props;

    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>Testsuite</h1>
          <ActivityMonitor sensors={sensors} />
          <hr />
          <AddSensorForm addSensor={addSensor} />
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
  return bindActionCreators({getSensors, addSensor}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TestSuite);
