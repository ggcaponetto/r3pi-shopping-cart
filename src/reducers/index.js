import { combineReducers } from 'redux'
import {
  UPDATE_CART_ITEMS
} from '../actions/actionTypes';

const initialState = {
  cartItems: []
};

function cartItems(cartItems = initialState.cartItems, action) {
  switch (action.type) {
    case UPDATE_CART_ITEMS:
      return action.payload
    default:
      return cartItems
  }
}

const shopApp = combineReducers({
  cartItems
})

export default shopApp;
