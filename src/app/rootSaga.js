import { all, spawn, call } from 'redux-saga/effects';
import cartSaga from 'features/cart/sagas';

export default function* rootSaga() {
  const sagas = [cartSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error('Saga call error!', e);
          }
        }
      })
    )
  );
}
