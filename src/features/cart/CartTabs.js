import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Box,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import { HighlightOff as RemoveIcon } from '@material-ui/icons';
import {
  getSelectedCartId,
  getCarts,
  cartActions
} from 'features/cart/cartSlice';

function CartTabs({ selectedCartId, carts, activeCart, removeCart }) {
  return (
    <Box component={Paper} variant="outlined" square>
      <Tabs
        value={selectedCartId}
        aria-label="List of shopping carts"
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
      >
        {carts?.map(({ id, label }, index) => (
          <Tab
            key={index}
            onClick={() => activeCart?.(id)}
            label={
              <Box display="flex" alignItems="center">
                <Box marginRight={1}>
                  <Typography>{label}</Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCart?.(id);
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            }
            value={id}
          />
        ))}
      </Tabs>
    </Box>
  );
}

CartTabs.propTypes = {
  selectedCartId: PropTypes.string,
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  activeCart: PropTypes.func,
  removeCart: PropTypes.func
};

function mapStateToProps(state) {
  return {
    carts: getCarts(state),
    selectedCartId: getSelectedCartId(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTabs);
