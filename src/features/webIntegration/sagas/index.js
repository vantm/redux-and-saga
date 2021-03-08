import { all } from 'redux-saga/effects';
import listenWindowEvent from './listenWindowEvent';

export default function* webIntegrationSaga() {
  yield all([listenWindowEvent()]);
}
