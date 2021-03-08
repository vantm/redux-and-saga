import { all } from 'redux-saga/effects';
import addToSelectedCart from './addToSelectedCart';
import requestNewCart from './requestNewCart';

export default function* cartSaga() {
  yield all([requestNewCart(), addToSelectedCart()]);
}
