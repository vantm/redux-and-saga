import { all } from 'redux-saga/effects';
import helloWorld from './helloWorld';

export default function* cartSaga() {
  yield all([helloWorld()]);
}
