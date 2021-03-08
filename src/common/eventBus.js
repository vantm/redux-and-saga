import EventEmitter from 'eventemitter3';
import {
  APP_CLOSE_NOTIFICATION_EVENT,
  APP_NOTIFIED_EVENT,
  MESSAGE_VARIANT_ERROR,
  MESSAGE_VARIANT_INFO,
  MESSAGE_VARIANT_SUCCESS,
  MESSAGE_VARIANT_WARNING
} from './constants';

class EventBus extends EventEmitter {
  constructor() {
    super();
    this.addListenerWithToken.bind(this);
    this.notifySuccess.bind(this);
    this.notifyInfo.bind(this);
    this.notifyWarning.bind(this);
    this.notifyError.bind(this);
  }

  addListenerWithToken(event, callback) {
    this.addListener(event, callback);
    return () => this.removeListener(event, callback);
  }

  notifySuccess(message, key) {
    this.#notify(message, key, MESSAGE_VARIANT_SUCCESS);
  }

  notifyInfo(message, key) {
    this.#notify(message, key, MESSAGE_VARIANT_INFO);
  }

  notifyWarning(message, key) {
    this.#notify(message, key, MESSAGE_VARIANT_WARNING);
  }

  notifyError(message, key) {
    this.#notify(message, key, MESSAGE_VARIANT_ERROR);
  }

  notifyClose(key) {
    this.emit(APP_CLOSE_NOTIFICATION_EVENT, { key });
  }

  #notify = (message, key, variant) => {
    this.emit(APP_NOTIFIED_EVENT, { key, message, variant });
  };
}

export default new EventBus();
