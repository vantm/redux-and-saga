import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTabId, getTabs, cartActions } from 'features/cart/cartSlice';
import Empty from 'containers/layouts/Empty';
import CartTabListBar from './components/CartTabListBar';
import ProductFilterInput from './components/ProductFilterInput';

function Home({ tabId, tabs, addTab, activeTab }) {
  const [value, setValue] = React.useState(null);

  return (
    <Empty>
      <Grid container>
        <Grid item xs={6} md={8}>
          <CartTabListBar
            selectedTabId={tabId}
            tabOptions={tabs}
            onAddTab={addTab}
            onTabChange={activeTab}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <ProductFilterInput
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </Grid>
      </Grid>
    </Empty>
  );
}

Home.propTypes = {
  tabId: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  addTab: PropTypes.func.isRequired,
  activeTab: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    tabs: getTabs(state),
    tabId: getTabId(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(cartActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
