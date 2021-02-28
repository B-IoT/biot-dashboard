import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import './MapMarker.css';
import tracker from '../../img/marker.svg';
import OutsideAlerter from '../OutsideAlerter';

export default function MapMarker({ item }) {
  const [showPopup, togglePopup] = React.useState(false);

  return (
    <div>
      <Popup
        className={showPopup ? 'popup' : 'hidden'}
        latitude={item.latitude}
        longitude={item.longitude}
        closeButton={false}
        anchor="top"
      >
        <div className="axiforma-medium-blue-18px">
          Cet {item.category} est {item.status} <br />
          <br />
        </div>
        <div className="axiforma-light-blue-18px">
          <pre>
            Étage: {item.floor} <br />
            Service: {item.service} <br />
            Batterie: {item.battery} %
          </pre>
        </div>
      </Popup>
      <Marker
        key={item.id}
        longitude={item.longitude}
        latitude={item.latitude}
        offsetLeft={-15}
        offsetTop={-30}
      >
        <OutsideAlerter action={() => togglePopup(false)}>
          <button className="tracker" onClick={() => togglePopup(!showPopup)}>
            <img src={tracker} alt="Tracker" width={30} />
          </button>
        </OutsideAlerter>
      </Marker>
    </div>
  );
}
