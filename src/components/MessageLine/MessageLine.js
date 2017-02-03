import React, { Component } from 'react';
import classNames from 'classnames';
import './messageLine.css';

export default class MessageLine extends Component {
  static propTypes = {
    message: React.PropTypes.string.isRequired
  };

  componentWillMount () {
    this.state = {show: false};
  }

  /**
   * When receiving new props, always reset state to show the message
   */
  componentWillReceiveProps (newProps) {
    if (newProps.message) {
      this.setState({show: true});
    }
  }

  render () {
    const cn = classNames(['MessageLine', {'is-visible': this.state.show}]);
    this.startHideTimer();

    return (
      <div className={cn}>
        { this.props.message }
      </div>
    );
  }

  startHideTimer () {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.setState({show: false});
    }, 1500);
  }
}
