import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

import MainSwitch from './pages';

const queryCache = new QueryCache();

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
});

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MainSwitch />
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
}
