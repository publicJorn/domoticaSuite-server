import React, { Component } from 'react';

export default class ComponentList extends Component {
  static propTypes = {
    Component: React.PropTypes.func.isRequired,
    componentPluralName: React.PropTypes.string.isRequired,
    collection: React.PropTypes.array.isRequired,
    className: React.PropTypes.string
  }

  render () {
    const {Component, componentPluralName, collection, className = ''} = this.props;

    return (
      <div>
        <ul className={className}>
          {collection.map((data, i) =>
            <li key={i}><Component {...data} /></li>
          )}
          {!collection.length ? <li>No {componentPluralName}</li> : ''}
        </ul>
      </div>
    );
  }
}
