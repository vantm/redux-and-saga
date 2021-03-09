import { call, take, put, select, all } from 'redux-saga/effects';
import {
  cartActions,
  getSelectedCartId,
  getProductById,
  countByCart
} from '../cartSlice';
import { isNil } from 'lodash';
import productApi from 'api/product';
import requestNewCart from './requestNewCart';

function* _addToCart(productId, quantity) {
  const selectedId = yield select(getSelectedCartId);
  let product = yield select(getProductById, productId);

  if (!product) {
    product = yield call(productApi.get, productId);
  }

  yield put(
    cartActions.addToCart({
      id: selectedId,
      product,
      quantity: isNil(quantity) ? 1 : quantity
    })
  );
}

export default function* addToSelectedCart() {
  while (true) {
    const { payload: productId } = yield take(
      cartActions.addToSelectedCart.type
    );

    const count = yield select(countByCart);

    if (count === 0) {
      yield all(requestNewCart());
      yield put(cartActions.addToSelectedCart(productId));
    } else {
      yield call(_addToCart, productId, 1);
    }
  }
}
