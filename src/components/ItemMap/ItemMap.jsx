import React from 'react';
import './ItemMap.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapboxGl from 'react-mapbox-gl';

function ItemMap() {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    minZoom: 8,
    attributionControl: false,
  });

  return (
    <div className="map-container">
      <div className="map-mask">
        <Map
          className="map"
          style={'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g'}
          containerStyle={{
            width: '80vw',
            height: '80vh',
            borderRadius: '100px',
          }}
          center={[6.891924, 46.440896]}
          zoom={[18]}
        />
        <div className="blurred-edges clear" />
      </div>
      <div className="map-blur clear">
        <div className="map-mask clear">
          <div className="map-ambient clear" />
          <div className="map-shadow clear" />
          <div className="map-light clear" />
        </div>
      </div>
    </div>
  );
}

export default ItemMap;
