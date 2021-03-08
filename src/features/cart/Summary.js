import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField
} from '@material-ui/core';
import {
  cartActions,
  getDiscountByCart,
  getSelectedCartId,
  getSubtotalByCart
} from 'features/cart/cartSlice';

function Summary({ selectedCartId, subtotal, discount, debouncedSetDiscount }) {
  const [discountValue, setDiscountValue] = useState();

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      component={Paper}
      variant="outlined"
      square
    >
      <Box marginBottom={1} flexGrow={1}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell align="right">{subtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  inputMode="numeric"
                  value={discountValue}
                  onChange={(e) => {
                    setDiscountValue(e.target.valueAsNumber);
                    debouncedSetDiscount?.({
                      id: selectedCartId,
                      discount: e.target.valueAsNumber
                    });
                  }}
                  inputProps={{
                    style: { textAlign: 'right' }
                  }}
                  fullWidth
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>GrandTotal</TableCell>
              <TableCell align="right">{subtotal - discount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box padding={1}>
        <Button disableElevation variant="contained" color="primary" fullWidth>
          Place Order
        </Button>
      </Box>
    </Box>
  );
}

Summary.propTypes = {
  selectedCartId: PropTypes.string,
  subtotal: PropTypes.number,
  discount: PropTypes.number,
  debouncedSetDiscount: PropTypes.func
};

function mapStateToProps(state) {
  const selectedCartId = getSelectedCartId(state);

  return {
    selectedCartId,
    subtotal: getSubtotalByCart(state, selectedCartId),
    discount: getDiscountByCart(state, selectedCartId)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
