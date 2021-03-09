import { createSlice } from '@reduxjs/toolkit';
import { featureName } from './constants';

const initialState = {
  value: 'light'
};

export const theme = createSlice({
  name: featureName,
  initialState,
  reducers: {
    change: (state, { payload: value }) => {
      state.value = value;
    }
  }
});

export const themeActions = {
  ...theme.actions
};

export default theme.reducer;
