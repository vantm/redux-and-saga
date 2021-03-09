import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { cartActions } from 'features/cart/cartSlice';

export function ButtonAddNewCart({ requestNewCart }) {
  return (
    <Button
      aria-label="Add a new shopping cart"
      onClick={() => requestNewCart?.()}
      startIcon={<AddIcon />}
      variant="contained"
      color="primary"
      disableElevation
    >
      New cart
    </Button>
  );
}

ButtonAddNewCart.propTypes = {
  requestNewCart: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(null, mapDispatchToProps)(ButtonAddNewCart);
