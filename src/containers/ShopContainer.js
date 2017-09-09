/* eslint no-unused-vars: "warn" */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/app/App';
import * as Actions from '../actions/actionCreators';

const mapStateToProps = state => ({
  cartItems: state.cartItems
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

const ShopContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ShopContainer;
