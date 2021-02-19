import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage/SearchPage';
import ECGPage from './pages/MapPage/MapPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:path(|search)">
          <SearchPage {...SearchPageData} />
        </Route>
        <Route path="/tracking">
          <ECGPage {...eCGPageData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

const SearchPageData = {
  searchTitle: 'Que cherchez-vous ?',
  searchText: 'Rechercher',

  ecgText: 'ECG',
  bedText: 'Lit',
  oxygenText: 'Oxygène',

  logo: '/img/biot---color-transparent-1@1x.png',
  placeHolder: '...',
};

const eCGPageData = {
  backtext: '< Retour',
  ecgtitle: 'Voici les ECG à proximité',
  maplight: '/img/lumi-re-1@1x.png',
  mapshadow: '/img/ombre-1@1x.png',
  maprimlight: '/img/masque-2@1x.png',
  map: '/img/groupe-9888-2@1x.png',
  caption1: 'ECG',
  caption2: 'ECG conseillé',
  caption3: 'Votre position',
};
