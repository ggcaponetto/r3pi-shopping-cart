import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from '../util/logger';

import Products from './Products';
import Basket from './Basket';
import Checkout from './Checkout';

const products = [
  {
    name: 'Apple',
    price: 0.25
  },
  {
    name: 'Orange',
    price: 0.30
  },
  {
    name: 'Banana',
    price: 0.15
  },
  {
    name: 'Papaya',
    price: 0.50,
    rules: [
      { type: 'discount', name: '3x2' }
    ]
  }
];

class Shop extends Component {
  static get NAME() {
    return 'Shop';
  }
  constructor(props, context) {
    super(props, context);
    log(`${Shop.NAME} constructor`, { props: this.props, state: this.state });
    this.state = {};
    this.getComponentToDisplay = this.getComponentToDisplay.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }
  componentDidMount() {
    log(`${Shop.NAME} componentDidMount`, { props: this.props, state: this.state });
  }
  getComponentToDisplay() {
    switch (this.props.selectedTabIndex) {
      case 0:
        return <Products products={products} {...this.props} />;
      case 1:
        return <Basket {...this.props} />;
      case 2:
        return <Checkout {...this.props} />;
      default:
        throw new Error(`Could not determine which react component
                        to display for tabIndex ${this.props.selectedTabIndex}`);
    }
  }
  selectTab(tabIndex) {
    log(`${Shop.NAME} selectTab`, { tabIndex });
    this.props.updateTabIndex(tabIndex);
  }
  render() {
    return (
      <div className="shop">
        <div
          style={{
            display: 'flex'
          }}
        >
          <button
            style={{ flex: 1 }}
            onClick={() => { this.selectTab(0); }}
          >
            <div>
              Products
            </div>
          </button>
          <button
            style={{ flex: 1 }}
            onClick={() => { this.selectTab(1); }}
          >
            <div>
              Basket ({this.props.cartItems.length} items)
            </div>
          </button>
          <button
            style={{ flex: 1 }}
            onClick={() => { this.selectTab(2); }}
          >
            <div>
              Checkout
            </div>
          </button>
        </div>
        <div>
          {this.getComponentToDisplay()}
        </div>
      </div>
    );
  }
}

Shop.propTypes = {
  selectedTabIndex: PropTypes.number.isRequired,
  updateTabIndex: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired
};

export default Shop;
