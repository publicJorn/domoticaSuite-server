import React, { Component } from 'react';
import ucFirst from '../../utils/ucFirst';

export default class ComponentList extends Component {
  static propTypes = {
    Component: React.PropTypes.func,
    componentPluralName: React.PropTypes.string,
    collection: React.PropTypes.array
  }

  render () {
    const {Component, componentPluralName, collection} = this.props;

    return (
      <div>
        <h3>{ucFirst(componentPluralName)}</h3>
        <ul>
          {collection.map((data, i) =>
            <li key={i}><Component {...data} /></li>
          )}
          {!collection.length ? <li>No {componentPluralName}</li> : ''}
        </ul>
      </div>
    );
  }
}
