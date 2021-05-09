import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SecureRoute from './utils/SecureRoute';

const queryClient = new QueryClient();

export const ANALYTICS_PATH = '/';
export const LOGIN_PATH = '/login';
export const INVENTORY_PATH = '/inventory';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <SecureRoute exact path={ANALYTICS_PATH} component={AnalyticsPage} />
          <Route path={LOGIN_PATH} component={LoginPage} />
          <SecureRoute path={INVENTORY_PATH} component={InventoryPage} />
          <Redirect to={ANALYTICS_PATH}/>
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
