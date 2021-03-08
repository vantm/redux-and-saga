import React, { useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import Empty from 'containers/layouts/Empty';
import CartTopAppBar from 'features/cart/CartTopAppBar';
import CartTabs from 'features/cart/CartTabs';
import CartProductList from 'features/cart/CartProductList';
import CartSummary from 'features/cart/CartSummary';
import eventBus from 'common/eventBus';

function Home() {
  useEffect(() => {
    eventBus.notifyInfo('Hello World!');
  }, []);

  return (
    <Empty>
      <CartTopAppBar />
      <Box marginBottom={1} />
      <Box marginBottom={1}>
        <CartTabs />
      </Box>
      <Box marginBottom={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={7} lg={8}>
            <CartProductList />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <CartSummary />
          </Grid>
        </Grid>
      </Box>
    </Empty>
  );
}

export default Home;
