// Mixing container- and presentational container
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';

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

// App.contextTypes = {
//   router: PropTypes.object.isRequired,
//   store: PropTypes.object.isRequired
// };

// TODO: We start using state on App when we get log in functionality
// const mapStateToProps = (state) => {
//   console.log(state);
//   return {};
// };

export default connect()(App);
