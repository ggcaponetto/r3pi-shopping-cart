import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from '../util/logger';

class Basket extends Component {
  static get NAME() {
    return 'Basket';
  }
  constructor(props, context) {
    super(props, context);
    log(`${Basket.NAME} constructor`, { props: this.props, state: this.state });
    this.state = {};
  }
  componentDidMount() {
    log(`${Basket.NAME} componentDidMount`, { props: this.props, state: this.state });
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
          <div>Basket</div>
        </div>
      </div>
    );
  }
}

Basket.propTypes = {
};

export default Basket;
