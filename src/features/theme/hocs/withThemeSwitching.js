import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

function withThemeSwitching(Component) {
  return function (props) {
    const themeName = useSelector((state) => state.theme.value);
    const theme = useMemo(
      () =>
        createMuiTheme({
          palette: {
            type: themeName
          }
        }),
      [themeName]
    );

    return (
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };
}

export default withThemeSwitching;
