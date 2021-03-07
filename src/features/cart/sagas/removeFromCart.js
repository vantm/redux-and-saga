import { take, put, select } from 'redux-saga/effects';
import { cartActions, getSelectedCartId } from '../cartSlice';

export default function* removeFromCart() {
  while (true) {
    const { payload: productId } = yield take(
      cartActions.requestRemoveFromCart.type
    );
    const selectedId = yield select(getSelectedCartId);
    yield put(cartActions.removeFromCart({ id: selectedId, productId }));
  }
}
