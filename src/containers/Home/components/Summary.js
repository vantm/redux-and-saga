import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import { cartActions } from 'features/cart/cartSlice';

function Summary() {
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      component={Paper}
      variant="outlined"
      square
      padding={2}
    >
      <Box marginBottom={1} flexGrow={1}>
        <Typography>Subtotal: {0}</Typography>
        <Typography>Discount: {0}</Typography>
        <Typography>GrandTotal: {0}</Typography>
        <Typography>Paid: {0}</Typography>
        <Typography>Excess: {0}</Typography>
      </Box>
      <Box>
        <Button disableElevation variant="contained" color="primary" fullWidth>
          Place Order
        </Button>
      </Box>
    </Box>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
