import React from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

function Navbar() {
  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Shopping Cart</Typography>
          <Box flexGrow={1} />
          <Box>
            <Button color="inherit">Open Second Screen</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box paddingTop={12} />
    </>
  );
}

export default Navbar;
