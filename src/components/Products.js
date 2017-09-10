import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from '../util/logger';


export const Product = ({ name, price, onClick }) => (
  <div style={{ flex: 1 }}>
    <button
      style={{ flex: 1 }}
      onClick={onClick}
    >
      {name}, CHF {price}
    </button>
  </div>
);

class Products extends Component {
  static get NAME() {
    return 'Products';
  }
  constructor(props, context) {
    super(props, context);
    log(`${Products.NAME} constructor`, { props: this.props, state: this.state });
    this.state = {};
    this.getProductList = this.getProductList.bind(this);
  }
  componentDidMount() {
    log(`${Products.NAME} componentDidMount`, { props: this.props, state: this.state });
  }
  getProductList() {
    const products = [];
    this.props.products.forEach((p, i) => {
      products.push(
        <Product
          key={JSON.stringify({ p, i })}
          name={p.name}
          price={p.price}
          rules={p.rules}
          onClick={() => {
            log(`${Products.NAME} onClick`, { product: p });
            const itemsInBasket = this.props.cartItems;
            // add the clicked product to the basket
            const updatedBacketItems = itemsInBasket.concat([p]);
            this.props.updateCartItems(updatedBacketItems);
          }}
        />
      );
    });
    return products;
  }
  render() {
    return (
      <div className="shop">
        <div
          style={{
            display: 'flex'
          }}
        >
          <div style={{ flex: 1 }}>
            {this.getProductList()}
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rules: PropTypes.array,
  onClick: PropTypes.func
};

Product.defaultProps = {
  rules: [],
  onClick: () => {}
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  cartItems: PropTypes.array.isRequired,
  selectedTabIndex: PropTypes.number.isRequired,
  updateTabIndex: PropTypes.func.isRequired,
  updateCartItems: PropTypes.func.isRequired
};

export default Products;
