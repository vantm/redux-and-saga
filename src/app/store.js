import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import cartReducers from 'features/cart/cartSlice';
import webIntegrationReducers from 'features/webIntegration/webIntegrationSlice';
import themeSlice from 'features/theme/themeSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartReducers,
    webIntegration: webIntegrationReducers,
    theme: themeSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
