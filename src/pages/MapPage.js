import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

export default function MapPage() {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  });

  return (
    <Map
      style="mapbox://styles/gondolav/ckg3j2q4h1qg019k8sdyhkvvy"
      containerStyle={{
        width: '90vw',
        height: '80vh',
        margin: 'auto',
      }}
      center={[6.6323, 46.5197]}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'hospital-15' }}>
        <Feature coordinates={[6.6424, 46.5249]} />
      </Layer>
    </Map>
  );
}
