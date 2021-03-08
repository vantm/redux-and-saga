import { put, takeLatest, delay } from 'redux-saga/effects';
import { cartActions } from '../cartSlice';

function* handleInput({ payload }) {
  yield delay(500);
  yield put(cartActions.setDiscount(payload));
}

export default function* debouncedSetDiscount() {
  yield takeLatest(cartActions.debouncedSetDiscount.type, handleInput);
}
