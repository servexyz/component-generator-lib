export const COMPONENT = `
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
export const COMPONENT_EXPORT = `
  import $Component from './$Component';

  export default { $Component };
`;
export const COMPONENT_TEST = ``;
export const COMPONENT_CSS = ``;
