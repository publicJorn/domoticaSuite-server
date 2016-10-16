import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import Header from '../../components/header/Header';

import './app.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {};
};

export default connect(
  mapStateToProps
)(App);
