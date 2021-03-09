import React, { useEffect } from 'react';
import { AppBar, Box, Grid, Toolbar } from '@material-ui/core';
import Empty from 'containers/layouts/Empty';
import CartTabs from 'features/cart/CartTabs';
import CartProductList from 'features/cart/CartProductList';
import CartSummary from 'features/cart/CartSummary';
import eventBus from 'common/eventBus';
import ProductFilterInput from 'features/cart/ProductFilterInput';
import ButtonAddNewCart from 'features/cart/ButtonAddNewCart';
import ButtonThemeSwitching from 'features/theme/ButtonThemeSwitching';

function Home() {
  useEffect(() => {
    eventBus.notifyInfo('Hello World!');
  }, []);

  return (
    <Empty>
      <AppBar elevation={0} position="static">
        <Toolbar>
          <Box>
            <ProductFilterInput />
          </Box>
          <Box flexGrow={1} />
          <Box>
            <ButtonThemeSwitching />
            <ButtonAddNewCart />
          </Box>
        </Toolbar>
      </AppBar>
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
