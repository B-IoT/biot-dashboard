import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import './MapMarker.css';
import tracker from '../../img/marker.svg';

export default function MapMarker({ item }) {
  const [showPopup, togglePopup] = React.useState(false);

  return (
    <div>
      <Popup
        className={showPopup ? '' : 'hidden'}
        latitude={item.latitude}
        longitude={item.longitude}
        closeButton={false}
        closeOnClick={false}
        onClose={() => togglePopup(false)}
        anchor="top"
      >
        <div>
          Cet {item.category} est {item.status}
        </div>
      </Popup>
      <Marker
        key={item.id}
        longitude={item.longitude}
        latitude={item.latitude}
        offsetLeft={-15}
        offsetTop={-30}
      >
        <img src={tracker} alt="Tracker" width={30} />
      </Marker>
    </div>
  );
}
