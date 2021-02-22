import React from 'react';
import './MapPage.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import BackButton from '../../components/BackButton/BackButton';
import Logo from '../../components/Logo/Logo';
import ItemMap from '../../components/ItemMap';

function MapPage() {
  return (
    <div class="map-page">
      <BackButton />
      <h1 className="axiforma-book-normal-blue-50px">
        {'Voici les ECG à proximité'}
      </h1>
      <div className="map-container">
        <ItemMap className="map" />
        <div className="blurred-edges" />
      </div>
      <Logo />
    </div>
  );
}

export default MapPage;
