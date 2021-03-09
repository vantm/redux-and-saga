import { createSlice } from '@reduxjs/toolkit';
import { featureName } from './constants';

export * from './selectors';

const initialState = {};

export const webIntegrationSlice = createSlice({
  name: featureName,
  initialState,
  reducers: {}
});

export const webIntegrationActions = {
  ...webIntegrationSlice.actions
};

export default webIntegrationSlice.reducer;
