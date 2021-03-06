import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import cartSlice from 'features/cart/cartSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
