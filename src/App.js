import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'app/Routes';
import appTheme from 'app/appTheme';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
