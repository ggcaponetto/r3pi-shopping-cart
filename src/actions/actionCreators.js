import {
  UPDATE_CART_ITEMS,
  UPDATE_TAB_INDEX
} from './actionTypes';

export function updateCartItems(newCartItems) {
  return {
    type: UPDATE_CART_ITEMS,
    payload: {
      newCartItems
    }
  };
}

export function updateTabIndex(tabIndex) {
  return {
    type: UPDATE_TAB_INDEX,
    payload: {
      tabIndex
    }
  };
}
