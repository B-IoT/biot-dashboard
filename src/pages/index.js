import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DevicesPage from './DevicesPage';
import HomePage from './HomePage';
import MapPage from './MapPage';

export default function MainSwitch(props) {
  return (
    <Switch>
      <Route path="/devices">
        <DevicesPage />
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
