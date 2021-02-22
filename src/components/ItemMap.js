import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapboxGl from 'react-mapbox-gl';

function ItemMap() {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    minZoom: 8,
    attributionControl: false,
  });

  return (
    <Map
      style={'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g'}
      containerStyle={{
        width: '80vw',
        height: '70vh',
      }}
      center={[6.891924, 46.440896]}
      zoom={[18]}
    />
  );
}

export default ItemMap;
