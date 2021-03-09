import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { cartActions } from 'features/cart/cartSlice';
import ToolbarInput from 'components/ToolbarInput';
import productApi from 'api/product';

const allProducts = productApi.list();

export function ProductFilterInput({ addToSelectedCart }) {
  return (
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
  );
}

ProductFilterInput.propTypes = {
  addToSelectedCart: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(null, mapDispatchToProps)(ProductFilterInput);
