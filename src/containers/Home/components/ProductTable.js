import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import {
  getProductsInSelectedCart,
  cartActions
} from 'features/cart/cartSlice';

function ProductTable({ value }) {
  return (
    <TableContainer component={Paper} variant="outlined" square>
      <Table aria-label="Product table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price (VND)</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total (VND)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {value?.map?.((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price * row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProductTable.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  )
};

function mapStateToProps(state) {
  return {
    value: getProductsInSelectedCart(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
