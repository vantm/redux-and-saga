import { call, take } from 'redux-saga/effects';
import createIntervalChannel from './channels/createIntervalChannel';
import eventBus from 'common/eventBus';

function* listenIntervalEvent() {
  const chan = yield call(createIntervalChannel);

  while (true) {
    const eventType = yield take(chan);
    eventBus.emit(eventType);
    console.debug(`listenIntervalEvent: event had been emitted.`);
  }
}

export default listenIntervalEvent;
