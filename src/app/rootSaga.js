import { all, spawn, call } from 'redux-saga/effects';
import cartSaga from 'features/cart/sagas';
import webIntegrationSaga from 'features/webIntegration/sagas';

export default function* rootSaga() {
  const sagas = [cartSaga, webIntegrationSaga];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(`Saga error: ${e.message}`, e);
          }
        }
      })
    )
  );
}
