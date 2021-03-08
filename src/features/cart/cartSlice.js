import { createSlice, createAction } from '@reduxjs/toolkit';
import { last } from 'lodash';
import { v4 as uuid } from 'uuid';

export * from './selectors';

function getLabel() {
  const now = new Date();
  return `Order #${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
}

const name = 'cart';

const requestNewCart = createAction(`${name}/requestNewCart`);
const addToSelectedCart = createAction(`${name}/addToSelectedCart`);

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
      delete state.byId[id];
      state.allIds = state.allIds.filter((x) => x !== id);
      if (id === state.selectedCartId) {
        state.selectedCartId = last(state.allIds);
      }
    },
    activeCart: (state, { payload: id }) => {
      if (state.byId[id]) {
        state.selectedCartId = id;
      }
    },
    setDiscount: (state, { payload: { id, discount } }) => {
      if (state.byId[id]) {
        state.byId[id].discount = discount;
      }
    },
    addToCart: (state, { payload: { id, product, quantity } }) => {
      if (!state.byId[id]) {
        return;
      }
      state.byId[id].items[product.id] = { id: product.id, quantity };
      state.refs[product.id] = product;
    },
    removeFromCart: (state, { payload: { id, productId } }) => {
      if (!state.byId[id]?.items[productId]) {
        return;
      }

      // TODO: Remove refs as well
      delete state.byId[id].items[productId];
    },
    setQuantity: (state, { payload: { id, productId, quantity } }) => {
      if (!state.byId[id]?.items?.[productId]) {
        return;
      }

      state.byId[id].items[productId].quantity = quantity <= 0 ? 0 : quantity;
    }
  }
});

export const cartActions = {
  ...cartSlice.actions,
  requestNewCart,
  addToSelectedCart
};

export default cartSlice.reducer;
