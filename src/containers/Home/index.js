import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Empty from 'containers/layouts/Empty';
import TopAppBar from './components/TopAppBar';
import CartTabs from './components/CartTabs';
import ProductTable from './components/ProductTable';
import Summary from './components/Summary';

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
          <Grid item xs={12} md={6} lg={8}>
            <ProductTable />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Summary />
          </Grid>
        </Grid>
      </Box>
    </Empty>
  );
}

export default Home;
