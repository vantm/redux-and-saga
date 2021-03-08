import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Empty from 'containers/layouts/Empty';
import TopAppBar from 'features/cart/TopAppBar';
import CartTabs from 'features/cart/CartTabs';
import ProductTable from 'features/cart/ProductTable';
import Summary from 'features/cart/Summary';

function Home() {
  return (
    <Empty>
      <TopAppBar />
      <Box marginBottom={1} />
      <Box marginBottom={1}>
        <CartTabs />
      </Box>
      <Box marginBottom={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={7} lg={8}>
            <ProductTable />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Summary />
          </Grid>
        </Grid>
      </Box>
    </Empty>
  );
}

export default Home;
