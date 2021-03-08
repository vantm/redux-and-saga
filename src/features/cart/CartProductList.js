import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import {
  Add as AddIcon,
  HighlightOff as CloseIcon,
  Remove as RemoveIcon
} from '@material-ui/icons';
import {
  cartActions,
  getProductsInSelectedCart,
  getSelectedCartId
} from 'features/cart/cartSlice';

function ProductTable({ selectedCartId, value, removeFromCart, setQuantity }) {
  return (
    <TableContainer component={Paper} variant="outlined" square>
      <Table aria-label="Product table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price (VND)</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total (VND)</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {value?.map?.((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                <TextField
                  value={row.quantity}
                  type="number"
                  inputMode="numeric"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setQuantity?.({
                              id: selectedCartId,
                              productId: row.id,
                              quantity: row.quantity - 1
                            })
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setQuantity?.({
                              id: selectedCartId,
                              productId: row.id,
                              quantity: row.quantity + 1
                            })
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  inputProps={{
                    style: { textAlign: 'right', width: '60px' }
                  }}
                />
              </TableCell>
              <TableCell align="right">{row.price * row.quantity}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart?.({ id: selectedCartId, productId: row.id });
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ProductTable.propTypes = {
  selectedCartId: PropTypes.string,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ),
  removeFromCart: PropTypes.func
};

function mapStateToProps(state) {
  return {
    selectedCartId: getSelectedCartId(state),
    value: getProductsInSelectedCart(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
