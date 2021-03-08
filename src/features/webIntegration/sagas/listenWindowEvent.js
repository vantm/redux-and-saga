import { call, take } from 'redux-saga/effects';
import createWindowActivityChannel from './channels/createWindowActivityChannel';
import eventBus from 'common/eventBus';

function* listenWindowEvent() {
  const chan = yield call(createWindowActivityChannel);

  while (true) {
    const eventType = yield take(chan);

    eventBus.emit(eventType);
    console.debug(`listenWindowEvent: emitted event '${eventType}'.`);
  }
}

export default listenWindowEvent;
