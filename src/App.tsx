import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import MaintenancePage from './pages/MaintenancePage/MaintenancePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SecureRoute from './utils/SecureRoute';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <SecureRoute exact path="/" component={AnalyticsPage} />
          <Route path="/login" component={LoginPage} />
          <SecureRoute path="/tracking" component={MaintenancePage} />
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
