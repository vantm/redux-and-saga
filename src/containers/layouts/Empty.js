import React from 'react';
import { Box, Container } from '@material-ui/core';

export default function Empty({ children }) {
  return (
    <>
      <Box paddingTop={3} />
      <Container component="main">{children}</Container>
    </>
  );
}
