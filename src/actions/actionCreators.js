import { UPDATE_CART_ITEMS }  from './actionTypes';

export function updateCartItems(newCartItems) {
  return {
    type: UPDATE_CART_ITEMS,
    payload: {
      newCartItems
    }
  };
}
