import { combineReducers } from 'redux';
import {
  UPDATE_CART_ITEMS,
  UPDATE_TAB_INDEX
} from '../actions/actionTypes';

const initialState = {
  selectedTabIndex: 0,
  cartItems: []
};

function cartItems(items = initialState.cartItems, action) {
  switch (action.type) {
    case UPDATE_CART_ITEMS:
      return action.payload.newCartItems;
    default:
      return items;
  }
}

function selectedTabIndex(tabIndex = initialState.selectedTabIndex, action) {
  switch (action.type) {
    case UPDATE_TAB_INDEX:
      return action.payload.tabIndex;
    default:
      return tabIndex;
  }
}

const shopApp = combineReducers({
  selectedTabIndex,
  cartItems
});

export default shopApp;
