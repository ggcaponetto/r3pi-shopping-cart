import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from '../util/logger';

class Checkout extends Component {
  static get NAME() {
    return 'Checkout';
  }
  constructor(props, context) {
    super(props, context);
    log(`${Checkout.NAME} constructor`, { props: this.props, state: this.state });
    this.state = {};
  }
  componentDidMount() {
    log(`${Checkout.NAME} componentDidMount`, { props: this.props, state: this.state });
  }
  render() {
    return (
      <div className="shop">
        <div
          style={{
            display: 'flex',
            backgroundColor: 'blue'
          }}
        >
          <div>Checkout</div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
};

export default Checkout;
