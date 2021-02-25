import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import MapPage from './pages/MapPage/MapPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path="/tracking" component={MapPage} />
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
