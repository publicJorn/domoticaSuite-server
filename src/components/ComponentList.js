import React, { Component } from 'react';
import classNames from 'classnames';

export default class ComponentList extends Component {
  static propTypes = {
    Component: React.PropTypes.func.isRequired,
    componentPluralName: React.PropTypes.string.isRequired,
    collection: React.PropTypes.array.isRequired,
    isLoading: React.PropTypes.bool,
    className: React.PropTypes.string
  }

  render () {
    const {Component, componentPluralName, collection, className = ''} = this.props;
    const cn = classNames([className, {'is-loading': this.props.isLoading}]);

    return (
      <div>
        <ul className={cn}>
          {collection.map((data, i) =>
            <li key={i}><Component {...data} /></li>
          )}
          {(!collection.length && !this.props.isLoading) ? <li>No {componentPluralName}</li> : ''}
        </ul>
      </div>
    );
  }
}
