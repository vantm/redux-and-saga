import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'app/Routes';
import NotificationFeature from 'features/notification/NotificationFeature';
import withThemeSwitcher from 'features/theme/hocs/withThemeSwitcher';

function App() {
  return (
    <NotificationFeature>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </NotificationFeature>
  );
}

export default withThemeSwitcher(App);
