import { APP_INTERVAL_5MIN_EVENT } from 'common/constants';
import { eventChannel } from 'redux-saga';

function createIntervalChannel() {
  return eventChannel((emitter) => {
    const interval = setInterval(() => {
      emitter(APP_INTERVAL_5MIN_EVENT);
    }, 1000 * 60 * 5);

    return () => {
      clearInterval(interval);
    };
  });
}

export default createIntervalChannel;
