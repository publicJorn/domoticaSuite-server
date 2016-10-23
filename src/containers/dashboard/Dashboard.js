// Mixing container- and presentational container
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ActivityMonitor from '../../components/ActivityMonitor/ActivityMonitor';
import './dashboard.css';

class Dashboard extends Component {
  static propTypes = {
    sensors: React.PropTypes.array,
    getSensors: React.PropTypes.func
  };

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

export default connect(mapStateToProps)(Dashboard);

// fetch('/test')
//   .then(res => res.text())
//   .then(text => console.log(text))
//   .catch(err => new Error(err));
