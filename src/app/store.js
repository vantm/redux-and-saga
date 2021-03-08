import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import cartReducers from 'features/cart/cartSlice';
import webIntegrationReducers from 'features/webIntegration/webIntegrationSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartReducers,
    webIntegration: webIntegrationReducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
