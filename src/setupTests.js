// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

const queryClient = new QueryClient();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
  items: {
    available: '#00c853',
    unavailable: '#d50000',
  },
  borderRadius: 16,
  maintenanceTitleTextSize: 18,
});

const useStyles = makeStyles((theme) => ({
  snackbar: {
    borderRadius: theme.borderRadius,
  },
}));

const Wrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} className={classes.snackbar}>
          <BrowserRouter>{children}</BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

global.URL.createObjectURL = jest.fn();

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
