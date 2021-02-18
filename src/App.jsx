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
const textPlaceholder = {
  text16: '...',
};

const SearchPageData = {
  searchTitle: 'Que cherchez-vous ?',
  searchText: 'Rechercher',

  ecgText: 'ECG',
  ecgIcon: '/img/ECGIcon.png',
  bedText: 'Lit',
  bedIcon: '/img/bedIcon.png',
  oxygenText: 'Oxygène',
  oxygenIcon: '/img/oxygenIcon.png',

  logo: '/img/biot---color-transparent-1@1x.png',
  placeHolder: textPlaceholder,
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
