import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import ActivityMonitor from '../../components/ActivityMonitor/ActivityMonitor';
import { fetchSensors } from '../../actions/sensors';
import './dashboard.css';

class Dashboard extends Component {
  static propTypes = {
    sensors: React.PropTypes.object,
    fetchSensors: React.PropTypes.func
  };

  componentDidMount () {
    this.props.fetchSensors();
  }

  render() {
    const { sensors } = this.props;

    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>Dashboard</h1>
          <ActivityMonitor sensors={sensors} />
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
