import React, { Component } from 'react';

export default class AddSensorForm extends Component {
  static propTypes = {
    saveSensor: React.PropTypes.func
  }

  handleAddSensor (evt) {
    evt.preventDefault();

    this.props.saveSensor({
      room: this.refs.room.value
    });

    this.refs.room.value = '';
  }

  render () {
    return (
      <form onSubmit={this.handleAddSensor.bind(this)}>
        Room: <input ref="room" type="number" />
        <button type="submit">Add sensor</button>
      </form>
    );
  }
}