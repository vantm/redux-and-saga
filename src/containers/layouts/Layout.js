import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from 'components/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container component="main">{children}</Container>
    </>
  );
}
