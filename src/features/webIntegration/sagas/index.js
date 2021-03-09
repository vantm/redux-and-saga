import { all } from 'redux-saga/effects';
import listenIntervalEvent from './listenIntervalEvent';
import listenWindowEvent from './listenWindowEvent';

export default function* webIntegrationSaga() {
  yield all([listenWindowEvent(), listenIntervalEvent()]);
}
