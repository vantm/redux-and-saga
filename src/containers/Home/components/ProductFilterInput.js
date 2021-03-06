import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import productApi from 'api/product';

const products = productApi.list();

function ProductFilterInput({ value, onChange }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onChange?.(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newValue) => {
        setInputValue(newValue);
      }}
      options={products}
      getOptionLabel={(x) => x.name}
      renderInput={(inputProps) => (
        <TextField {...inputProps} variant="outlined" />
      )}
      fullWidth
    />
  );
}

export default ProductFilterInput;
