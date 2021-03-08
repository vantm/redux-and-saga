import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import { Add as AddIcon, Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { cartActions } from 'features/cart/cartSlice';
import ToolbarInput from 'components/ToolbarInput';
import productApi from 'api/product';

const allProducts = productApi.list();

function TopAppBar({ requestNewCart, addToSelectedCart }) {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Box>
          <Autocomplete
            onChange={(_, newValue) => {
              addToSelectedCart(newValue.id);
            }}
            options={allProducts}
            getOptionLabel={(x) => x.name}
            renderInput={(params) => (
              <ToolbarInput
                icon={<SearchIcon />}
                ref={params.InputProps.ref}
                InputProps={{
                  placeholder: 'Search product ...',
                  inputProps: { ...params.inputProps }
                }}
              />
            )}
            fullWidth
            clearOnEscape
            clearOnBlur
          />
        </Box>
        <Box flexGrow={1} />
        <Box>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

TopAppBar.propTypes = {
  requestNewCart: PropTypes.func,
  addToSelectedCart: PropTypes.func
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);
