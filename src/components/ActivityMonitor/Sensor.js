import React, { Component } from 'react';

export default class Sensor extends Component {
  static propTypes = {
    arduinoId: React.PropTypes.string,
    room: React.PropTypes.string,
    status: React.PropTypes.string
  }

  render () {
    return (
      <div data-arduino-id={this.props.arduinoId}>
        Kamer <strong>{this.props.room}</strong> is {this.props.status}.
      </div>
    );
  }
}
