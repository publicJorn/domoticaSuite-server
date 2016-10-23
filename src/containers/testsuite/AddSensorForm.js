import React, { Component } from 'react';

export default class AddSensorForm extends Component {
  static propTypes = {
    addSensor: React.PropTypes.func
  }

  handleAddSensor (evt) {
    evt.preventDefault();

    this.props.addSensor({
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
