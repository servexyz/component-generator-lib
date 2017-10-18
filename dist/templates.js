"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const COMPONENT = exports.COMPONENT = `
  import React from 'react';
  import PropTypes from 'prop-types';

  class $Component extends React.Component {
    static defaultProps = {
      place: 'holder'
    }
    static propTypes = {
      place: React.PropTypes.string.isRequired
    }
    state = {
      foo: 'bar'
    }
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          { this.state.foo }
        </div>
      )
    }
  }
`;
const COMPONENT_EXPORT = exports.COMPONENT_EXPORT = `
  import $Component from './$Component';

  export default { $Component };
`;
const COMPONENT_TEST = exports.COMPONENT_TEST = ``;
const COMPONENT_CSS = exports.COMPONENT_CSS = ``;