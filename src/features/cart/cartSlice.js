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
const requestRemoveFromCart = createAction(`${name}/requestRemoveFromCart`);

export const cartSlice = createSlice({
  name,
  initialState: {
    allIds: [],
    byId: {},
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
      state.byId[cart.id] = cart;
      state.selectedCartId = cart.id;
    },
    removeCart: (state, { payload: id }) => {
      remove(state.allIds, (x) => x.id === id);
      delete state.byId[id];
      if (id === state.selectedCartId) {
        state.selectedCartId = last(state.allIds);
      }
    },
    activeCart: (state, { payload: id }) => {
      if (state.byId[id]) {
        state.selectedCartId = id;
      }
    },
    addToCart: (state, { payload: { id, product, quantity } }) => {
      if (!state.byId[id]) {
        return;
      }

      state.refs[product.id] = product;

      const qty = state.byId[id].items[product.id]?.quantity ?? 0;

      state.byId[id].items[product.id] = {
        id: product.id,
        quantity: quantity + qty
      };
    },
    removeFromCart: (state, { payload: { id, productId } }) => {
      if (!state.byId[id]) {
        return;
      }

      // TODO: Remove refs as well

      delete state.byId[id].items[productId];
    }
  }
});

export const cartActions = {
  ...cartSlice.actions,
  requestNewCart,
  requestAddToCart,
  requestRemoveFromCart
};

export const getCarts = ({ cart }) => Object.values(cart.byId);
export const getSelectedCartId = ({ cart }) => cart.selectedCartId;
export const getProductsInSelectedCart = ({ cart }) =>
  getProducts({ cart }, cart.selectedCartId);
export const getProduct = ({ cart }, productId) => cart.refs[productId];
export const getProducts = ({ cart }, cartId) => {
  return valuesIn(cart.byId[cartId]?.items).map((x) => ({
    ...x,
    ...cart.refs[x.id]
  }));
};

export default cartSlice.reducer;
