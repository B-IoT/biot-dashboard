import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ItemsPage from './ItemsPage';
import HomePage from './HomePage';
import MapPage from './MapPage';

export default function MainSwitch(props) {
  return (
    <Switch>
      <Route path="/items">
        <ItemsPage />
      </Route>

      <Route path="/map">
        <MapPage />
      </Route>

      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}
