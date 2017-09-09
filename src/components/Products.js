import React, { Component } from 'react';
import PropTypes from 'prop-types';
import log from '../util/logger';


const Product = ({ name, price }) => (
  <div>
    {name}, CHF {price}
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
    this.props.products.forEach((p) => {
      products.push(
        <Product
          name={p.name}
          price={p.price}
          rules={p.rules}
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
            display: 'flex',
            backgroundColor: 'blue'
          }}
        >
          <div>
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
  rules: PropTypes.array
};

Product.defaultProps = {
  rules: []
};

Products.propTypes = {
  products: PropTypes.array.isRequired
};

export default Products;
