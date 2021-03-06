import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

function CartTabListBar({ selectedTabId, tabOptions, onTabChange, onAddTab }) {
  return (
    <Tabs
      value={selectedTabId}
      onChange={(event, newValue) => onTabChange?.(newValue)}
      aria-label="Cart Tab List"
      variant="scrollable"
    >
      {tabOptions?.map(({ id, label }, index) => (
        <Tab label={label} value={id} key={index} />
      ))}
      <Tab
        label={<AddIcon />}
        onClick={(e) => {
          e.stopPropagation();
          onAddTab?.();
        }}
        key={-1}
        value={null}
        style={{ width: 32 }}
      />
    </Tabs>
  );
}

CartTabListBar.propTypes = {
  selectedTabId: PropTypes.string,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  onTabChange: PropTypes.func,
  onAddTab: PropTypes.func
};

export default CartTabListBar;
