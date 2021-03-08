import React, { Component } from 'react';
import { SnackbarProvider, withSnackbar } from 'notistack';
import eventBus from 'common/eventBus';
import {
  APP_NOTIFIED_EVENT,
  APP_CLOSE_NOTIFICATION_EVENT,
  MESSAGE_VARIANT_INFO,
  MESSAGE_VARIANT_SUCCESS,
  MESSAGE_VARIANT_WARNING,
  MESSAGE_VARIANT_ERROR
} from 'common/constants';

class NotificationFeature extends Component {
  _subs = [];

  componentDidMount() {
    const { enqueueSnackbar, closeSnackbar } = this.props;

    this.#subscribe(APP_NOTIFIED_EVENT, (event) => {
      const { key, message, variant } = event || {};

      if (!message) return;

      enqueueSnackbar(message, {
        key,
        variant: this.#getVariant(variant),
        preventDuplicate: true
      });
    });

    this.#subscribe(APP_CLOSE_NOTIFICATION_EVENT, (event) => {
      const { key } = event || {};

      if (!key) return;

      closeSnackbar(key);
    });
  }

  componentWillUnmount() {
    this._subs.forEach((unsub) => unsub());
  }

  render() {
    return this.props.children;
  }

  #subscribe = (event, callback) => {
    this._subs.push(eventBus.addListenerWithToken(event, callback));
  };

  #getVariant = (messageVariant) => {
    switch (messageVariant) {
      case MESSAGE_VARIANT_INFO:
        return 'info';
      case MESSAGE_VARIANT_SUCCESS:
        return 'success';
      case MESSAGE_VARIANT_WARNING:
        return 'warning';
      case MESSAGE_VARIANT_ERROR:
        return 'error';
      default:
        return 'default';
    }
  };
}

function withSnackbarProvider(WrappedComponent) {
  const WrappedComponentWithSnackbar = withSnackbar(WrappedComponent);
  return function (props) {
    return (
      <SnackbarProvider maxSnack={3}>
        <WrappedComponentWithSnackbar {...props} />
      </SnackbarProvider>
    );
  };
}

export default withSnackbarProvider(NotificationFeature);
