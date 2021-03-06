import { call, take, put, select } from 'redux-saga/effects';
import { cartActions, getSelectedCartId, getProduct } from '../cartSlice';
import productApi from 'api/product';
import { isNil } from 'lodash';

export default function* addToCart() {
  while (true) {
    const selectedId = yield select(getSelectedCartId);
    const { payload: productId, quantity } = yield take(
      cartActions.requestAddToCart.type
    );
    let product = yield select(getProduct, productId);

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
}
