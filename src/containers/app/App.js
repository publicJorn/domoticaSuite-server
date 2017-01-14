// Mixing container- and presentational container
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import bindSensorSocketToActions from '../../services/sensors.service';
import Header from '../../components/Header/Header';

import './app.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    bindSensorSocketToActions: React.PropTypes.func.isRequired
  };

  componentDidMount () {
    console.info('App, this.props', this.props);
    this.props.bindSensorSocketToActions();
  }

  render() {
    return (
      <div className="container">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

// TODO: We start using state on App when we get log in functionality
// const mapStateToProps = (state) => {
//   return {};
// };

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({bindSensorSocketToActions}, dispatch);
};

export default connect(null, mapDispatchToProps)(App);
