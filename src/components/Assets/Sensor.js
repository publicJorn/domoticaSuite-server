import React, { Component } from 'react';

export default class Sensor extends Component {
  static propTypes = {
    arduinoId: React.PropTypes.string,
    name: React.PropTypes.string,
    status: React.PropTypes.string
  }

  render () {
    return (
      <div data-arduino-id={this.props.arduinoId}>
        <strong>{this.props.name}</strong> is {this.props.status}.
      </div>
    );
  }
}
