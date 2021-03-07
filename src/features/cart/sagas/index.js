import { all } from 'redux-saga/effects';
import addToCart from './addToCart';
import newCart from './newCart';
import removeFromCart from './removeFromCart';

export default function* cartSaga() {
  yield all([newCart(), addToCart(), removeFromCart()]);
}
