import React, { Component } from 'react';

export default class Sensor extends Component {
  static propTypes = {
    id: React.PropTypes.string,
    room: React.PropTypes.string,
    status: React.PropTypes.string
  }

  render () {
    return (
      <div data-uuid={this.props.id}>
        Kamer <strong>{this.props.room}</strong> is {this.props.status}.
      </div>
    );
  }
}
