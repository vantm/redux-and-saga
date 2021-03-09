import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { themeActions } from './themeSlice';

function ButtonThemeSwitching({ value, changeTheme }) {
  return (
    <Switch
      checked={value === 'dark' ? true : false}
      onChange={() => changeTheme?.(value === 'dark' ? 'light' : 'dark')}
      name="button-theme-switching"
      inputProps={{ 'aria-label': 'Button to switch themes' }}
    />
  );
}

ButtonThemeSwitching.propTypes = {
  value: PropTypes.string.isRequired,
  changeTheme: PropTypes.func
};

function mapStateToProps(state) {
  return {
    value: state.theme.value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(themeActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonThemeSwitching);
