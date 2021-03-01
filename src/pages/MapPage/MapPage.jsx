import React from 'react';
import './MapPage.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import BackButton from '../../components/BackButton/BackButton';
import Logo from '../../components/Logo/Logo';
import ItemMap from '../../components/ItemMap/ItemMap';

function MapPage(props) {
  const { itemName } = props.location.state;
  return (
    <div className="map-page">
      <BackButton />
      <h1 className="axiforma-medium-blue-50px">
        {'Voici les ' + itemName + 's à proximité'}
      </h1>
      <ItemMap itemName={itemName} />
      <Logo />
    </div>
  );
}

export default MapPage;
