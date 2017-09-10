import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from '../util/logger';
import { groupBy } from './Checkout';

export const LIGHT_RED = '#ffc1c1';

class Basket extends Component {
  static get NAME() {
    return 'Basket';
  }
  constructor(props, context) {
    super(props, context);
    log(`${Basket.NAME} constructor`, { props: this.props, state: this.state });
    this.state = {};
    this.getCartItems = this.getCartItems.bind(this);
    this.getBasketControls = this.getBasketControls.bind(this);
  }
  componentDidMount() {
    log(`${Basket.NAME} componentDidMount`, { props: this.props, state: this.state });
  }
  componentWillReceiveProps(nextProps) {
    log(`${Basket.NAME} componentWillReceiveProps`, { props: this.props, nextProps });
  }
  getBasketControls() {
    const items = [].concat(this.props.cartItems);
    // if there are no items in the basket do not display controls.
    if (items.length === 0) return null;
    items.sort((p1, p2) => p1.name >= p2.name);
    const groupedItems = groupBy(items, 'name');
    const backetActions = [];
    Object.keys(groupedItems).forEach((key, i) => {
      const group = groupedItems[key];
      backetActions.push(
        <div
          key={JSON.stringify({ key, i })}
          style={{ display: 'flex', flex: 1 }}
        >
          <button
            className="button-warning pure-button"
            style={{ flex: 1 }}
            onClick={() => {
              const itemsInBasket = [].concat(this.props.cartItems);
              // remove the group of products
              const filteredItems = itemsInBasket.filter(p => p.name !== group[0].name);
              this.props.updateCartItems(filteredItems);
            }}
          >
            remove {group.length} x {key}
          </button>
        </div>
      );
    });
    backetActions.push(
      <div
        key={JSON.stringify({ type: 'removeAll' })}
        style={{ display: 'flex', flex: 1 }}
      >
        <button
          className="button-error pure-button"
          style={{ flex: 1 }}
          onClick={() => {
            // remove all products
            this.props.updateCartItems([]);
          }}
        >
          remove all
        </button>
      </div>
    );
    return backetActions;
  }
  getCartItems() {
    const products = [];
    const items = [].concat(this.props.cartItems);
    items.forEach((p, i) => {
      products.push(
        <div
          key={JSON.stringify({ p, i })}
          style={{ flex: 1 }}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
              <p>
                {p.name}, {p.price} CHF
              </p>
            </div>
            <button
              className="button-warning pure-button"
              style={{ flex: 1 }}
              onClick={() => {
                log(`${Basket.NAME} onClick`, { product: p });
                const itemsInBasket = [].concat(items);
                // remove the clicked product from the basket
                const indexToRemove =
                  itemsInBasket.findIndex(product => product.name === p.name);
                if (indexToRemove >= 0) {
                  itemsInBasket.splice(indexToRemove, 1);
                  this.props.updateCartItems(itemsInBasket);
                } else {
                  // should never happen
                  throw new Error('Trying to remove an item that is not present in the basket');
                }
              }}
            >
              remove
            </button>
          </div>
        </div>
      );
    });
    // sort the items by product name (optional)
    products.sort((p1, p2) => {
      const a = JSON.parse(p1.key);
      const b = JSON.parse(p2.key);
      return a.p.name >= b.p.name;
    });
    return products;
  }
  render() {
    return (
      <div className="shop">
        <div
          style={{}}
        >
          <div
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {this.getBasketControls()}
          </div>
          {this.getCartItems()}
        </div>
      </div>
    );
  }
}

Basket.propTypes = {
  cartItems: PropTypes.array.isRequired,
  updateCartItems: PropTypes.func.isRequired
};

export default Basket;
