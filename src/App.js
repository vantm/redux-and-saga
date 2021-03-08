import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'app/Routes';
import appTheme from 'app/appTheme';
import NotificationFeature from 'features/notification/NotificationFeature';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <NotificationFeature>
        <CssBaseline />
        <Router>
          <Routes />
        </Router>
      </NotificationFeature>
    </ThemeProvider>
  );
}

export default App;
