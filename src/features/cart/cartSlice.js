import { createSlice, createAction } from '@reduxjs/toolkit';
import { last, remove, valuesIn } from 'lodash';
import { v4 as uuid } from 'uuid';

function getLabel() {
  const now = new Date();
  return `Order #${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
}

const name = 'cart';

const requestNewCart = createAction(`${name}/requestNewCart`);
const requestAddToCart = createAction(`${name}/requestAddToCart`);

export const cartSlice = createSlice({
  name,
  initialState: {
    allIds: [],
    byIds: {},
    selectedCartId: null,
    refs: {}
  },
  reducers: {
    addCart: (state, { payload: label }) => {
      const cart = {
        id: uuid(),
        label: label ?? getLabel(),
        discount: 0,
        items: {}
      };
      state.allIds.push(cart.id);
      state.byIds[cart.id] = cart;
      state.selectedCartId = cart.id;
    },
    removeCart: (state, { payload: id }) => {
      remove(state.allIds, (x) => x.id === id);
      state.byIds[id] = undefined;
      state.selectedCartId = last(state.allIds);
    },
    activeCart: (state, { payload: id }) => {
      if (state.byIds[id]) {
        state.selectedCartId = id;
      }
    },
    addToCart: (state, { payload: { id, product, quantity } }) => {
      if (state.byIds[id]) {
        state.refs[product.id] = product;

        const qty = state.byIds[id].items[product.id]?.quantity ?? 0;

        state.byIds[id].items[product.id] = {
          id: product.id,
          quantity: quantity + qty
        };
      }
    }
  }
});

export const cartActions = {
  ...cartSlice.actions,
  requestNewCart,
  requestAddToCart
};

export const getCarts = ({ cart }) => Object.values(cart.byIds);
export const getSelectedCartId = ({ cart }) => cart.selectedCartId;
export const getProductsInSelectedCart = ({ cart }) =>
  getProducts({ cart }, cart.selectedCartId);
export const getProduct = ({ cart }, productId) => cart.refs[productId];
export const getProducts = ({ cart }, cartId) => {
  return valuesIn(cart.byIds[cartId]?.items).map((x) => ({
    ...x,
    ...cart.refs[x.id]
  }));
};

export default cartSlice.reducer;
