import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import {
  getSelectedCartId,
  getCarts,
  cartActions
} from 'features/cart/cartSlice';

function CartTabs({ selectedCartId, carts, activeCart }) {
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
            label={label}
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
  activeCart: PropTypes.func
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
