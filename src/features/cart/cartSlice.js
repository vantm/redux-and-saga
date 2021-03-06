import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import { v4 as uuid } from 'uuid';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    allProductIds: [],
    products: {},
    allTabIds: [],
    tabs: {},
    tabId: null
  },
  reducers: {
    addTab: (state) => {
      const now = new Date();
      const tab = {
        id: uuid(),
        label: `ORDER #${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`,
        discount: 0
      };
      state.allTabIds.push(tab.id);
      state.tabs[tab.id] = tab;
      state.tabId = tab.id;
    },
    removeTab: (state, id) => {
      remove(state.tabs, (x) => x.id === id);
      state.tabs[id] = undefined;
      state.tabId = state.allTabIds[state.allTabIds.length - 1];
    },
    activeTab: (state, id) => {
      if (state.tabs[id]) {
        state.tabId = id;
      }
    },
    setDiscount: (state, value) => {
      const tab = state.tabs[state.tabId];
      if (tab) {
        tab.discount = value;
      }
    }
  }
});

export const cartActions = cartSlice.actions;

export const getTabs = ({ cart }) => Object.values(cart.tabs);
export const getTab = ({ cart }) => cart.tabs[cart.tabId];
export const getTabId = ({ cart }) => cart.tabId;

export default cartSlice.reducer;
