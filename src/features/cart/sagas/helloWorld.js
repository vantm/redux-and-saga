import { call, delay } from 'redux-saga/effects';

function* sayHello() {
  console.log('Hello world!');
}

export default function* helloWorld() {
  yield delay(1000);
  yield call(sayHello);
}
