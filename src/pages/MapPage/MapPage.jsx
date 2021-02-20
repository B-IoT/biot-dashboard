import React from 'react';
import './MapPage.css';
import BackButton from '../../components/BackButton/BackButton';
import Logo from '../../components/Logo/Logo';

function MapPage() {
  return (
    <div class="map-page">
      <BackButton />
      <h1 className="axiforma-book-normal-blue-50px">
        {'Voici les ECG à proximité'}
      </h1>
      <Logo />
    </div>
  );
}

export default MapPage;
