import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import MapPage from './pages/MapPage/MapPage';
import LoginPage from './pages/LoginPage/LoginPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/tracking" component={MapPage} />
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
