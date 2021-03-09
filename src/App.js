import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'app/Routes';
import NotificationFeature from 'features/notification/NotificationFeature';
import withThemeSwitching from 'features/theme/hocs/withThemeSwitching';

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

export default withThemeSwitching(App);
