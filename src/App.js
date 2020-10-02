import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';

import MainSwitch from './pages';

const queryCache = new QueryCache();

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <CssBaseline />
      <HashRouter>
        <MainSwitch />
      </HashRouter>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
}
