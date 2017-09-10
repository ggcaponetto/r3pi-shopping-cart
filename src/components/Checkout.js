import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from '../util/logger';

// TODO docs
const hasDiscountPolicy =
  p => p.rules && p.rules.some(
    rule => rule.type === 'discount' && rule.name === '3x2'
  );

// TODO docs
export const groupBy = (arr, property) => arr.reduce((accumulator, currentValue) => {
  const accu = accumulator;
  const currVal = currentValue;

  if (!accu[currVal[property]]) {
    accu[currVal[property]] = [];
  }
  accu[currVal[property]].push(currVal);
  return accu;
}, {});

/** @function getDiscountLabel
* @param {array} group group of products
* @return {string} formatted discount string
*/
function getDiscountLabel(group) {
  const productRule = group[0].rules && group[0].rules.find(
    rule => rule.name === '3x2'
  );
  return productRule ? `(${productRule.name} discount)` : null;
}

class Checkout extends Component {
  static get NAME() {
    return 'Checkout';
  }
  constructor(props, context) {
    super(props, context);
    log(`${Checkout.NAME} constructor`, { props: this.props, state: this.state });
    this.state = {};
    this.getBillingInfo = this.getBillingInfo.bind(this);
  }
  componentDidMount() {
    log(`${Checkout.NAME} componentDidMount`, { props: this.props, state: this.state });
  }
  getBillingInfo() {
    const items = this.props.cartItems;
    // sort the items by product name (optional)
    items.sort((p1, p2) => p1.name >= p2.name);
    // group the elements by product name
    const groupedItems = groupBy(items, 'name');
    log(`${Checkout.NAME} getBillingInfo`, { groupedItems });

    let total = 0;
    const billRows = [];
    billRows.push(
      <div
        key={JSON.stringify({ heading: true })}
      >
        <div>
          <h4>Billing info</h4>
        </div>
        <div
          style={{
            flex: 1,
            height: '2px',
            backgroundColor: 'black',
            marginTop: 10,
            marginBottom: 10
          }}
        />
      </div>
    );
    Object.keys(groupedItems).forEach((key, i) => {
      const group = groupedItems[key];
      log(`${Checkout.NAME} generating billing info for group`, { group });
      const groupCount = group.length;
      billRows.push(
        <div
          key={JSON.stringify({ group, i })}
          style={{ flex: 1 }}
          className="productGroup"
        >
          {groupCount} x {group[0].name} {getDiscountLabel(group)}
        </div>
      );
      let subTotal = 0;
      if (hasDiscountPolicy(group[0])) {
        // number that indicates the tree packs (e.g. 1 = 3 papayas)
        const threePacks = Math.floor(group.length / 3);
        // one three pack costs the amount of 2 papayas (one is free)
        subTotal += threePacks * (group[0].price * 2);
        /*
          add the price for the spare papayas
          (e.g. for 14 papayas, ppu = price per unit)
          4 * 2 * ppu + 2 * ppu
        */
        subTotal += (group.length - (threePacks * 3)) * group[0].price;
      } else {
        group.forEach((p) => {
          subTotal += p.price;
        });
      }
      billRows.push(
        <div
          key={JSON.stringify({ group, i, subTotal: true })}
          style={{ display: 'flex', flex: 1 }}
          className="subTotal"
        >
          <div style={{ flex: 1, textAlign: 'right' }}>
            {group[0].name} subtotal: {subTotal.toFixed(2)} CHF
          </div>
        </div>
      );
      total += subTotal;
    });
    billRows.push(
      <div
        key={JSON.stringify({ spacer: true })}
        style={{
          flex: 1,
          height: '2px',
          backgroundColor: 'black',
          marginTop: 10,
          marginBottom: 10
        }}
      />
    );
    billRows.push(
      <div
        key={JSON.stringify({ total: true })}
        style={{
          flex: 1,
          textAlign: 'right'
        }}
        className="total"
      >
        <div
          style={{ margin: 10, fontWeight: 'bold', fontSize: '18px' }}
        >
          Total: {total.toFixed(2)} CHF
        </div>
      </div>
    );
    return billRows;
  }
  render() {
    return (
      <div className="shop">
        <div
          style={{
            display: 'flex'
          }}
        >
          <div style={{ flex: 1, margin: 20 }}>
            {this.getBillingInfo()}
          </div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.array.isRequired
};

export default Checkout;
