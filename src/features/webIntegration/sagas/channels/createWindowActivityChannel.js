import { APP_FOCUSED_EVENT, APP_BLURRED_EVENT } from 'common/constants';
import { eventChannel, END } from 'redux-saga';

function subscribeWindowEvent(event, callback) {
  window.addEventListener(event, callback);

  return () => {
    window.removeEventListener(event, callback);
  };
}

function createWindowActivityChannel() {
  return eventChannel((emitter) => {
    const unsubscribeFocused = subscribeWindowEvent('focus', () =>
      emitter(APP_FOCUSED_EVENT)
    );
    const unsubscribeBlurred = subscribeWindowEvent('blur', () =>
      emitter(APP_BLURRED_EVENT)
    );
    const unsubscribeUnloaded = subscribeWindowEvent('unload', () =>
      emitter(END)
    );

    return () => {
      unsubscribeFocused();
      unsubscribeBlurred();
      unsubscribeUnloaded();
    };
  });
}

export default createWindowActivityChannel;
