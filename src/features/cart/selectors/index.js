import { sum, valuesIn } from 'lodash';

export const getCarts = ({ cart: state }) => Object.values(state.byId);

export const getSelectedCartId = ({ cart: state }) => state.selectedCartId;

export const getProductById = ({ cart: state }, id) => state.refs[id];

export const getProductsInSelectedCart = ({ cart: state }) =>
  getProductsByCart({ cart: state }, state.selectedCartId);

export const getProductsByCart = ({ cart }, cartId) => {
  return valuesIn(cart.byId[cartId]?.items).map((x) => ({
    ...x,
    ...cart.refs[x.id]
  }));
};

export const getSubtotalByCart = ({ cart: state }, id) => {
  const cart = state.byId[id];

  if (!cart) return 0;

  const prices = Object.values(cart.items).map((item) => {
    return item.quantity * state.refs[item.id].price;
  });

  return sum(prices);
};

export const getDiscountByCart = ({ cart: state }, id) => {
  return state.byId[id]?.discount ?? 0;
};

export const countByCart = ({ cart: state }) => state.allIds.length;
