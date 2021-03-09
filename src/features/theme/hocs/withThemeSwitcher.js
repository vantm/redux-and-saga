import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  }
});

function withThemeSwitcher(Component) {
  return function (props) {
    const themeName = useSelector((state) => state.theme.value);
    const theme = themeName === 'dark' ? darkTheme : lightTheme;

    return (
      <ThemeProvider theme={theme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };
}

export default withThemeSwitcher;
