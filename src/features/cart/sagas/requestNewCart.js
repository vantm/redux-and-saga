import { call, take, put } from 'redux-saga/effects';
import { cartActions } from '../cartSlice';
import tabApi from 'api/tab';

export default function* requestNewCart() {
  while (true) {
    yield take(cartActions.requestNewCart.type);
    const id = yield call(tabApi.getLabel);
    yield put(cartActions.addCart(id));
  }
}
