import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import OutsideAlerter from '../../utils/OutsideAlerter';
import { Item } from '../../utils/items';
import tracker from '../../img/marker.svg';
import './MapMarker.css';

export default function MapMarker(props: { item: Item }) {
  const [showPopup, togglePopup] = useState(false);

  return (
    <div>
      <Popup
        className={showPopup ? 'popup' : 'hidden'}
        latitude={props.item.latitude}
        longitude={props.item.longitude}
        closeButton={false}
        anchor="top"
      >
        <div className={showPopup ? 'popup-animation' : 'hidden'}>
          <div className="axiforma-medium-blue-22px">
            {props.item.category} {props.item.status}
            <br />
            <br />
          </div>
          <div
            className={
              props.item.floor == null ? 'hidden' : 'axiforma-light-blue-20px'
            }
          >
            {'Étage: ' + props.item.floor}
          </div>
          <div
            className={
              props.item.service == null ? 'hidden' : 'axiforma-light-blue-20px'
            }
          >
            {'Service: ' + props.item.service}
          </div>
          <div
            className={
              props.item.battery == null ? 'hidden' : 'axiforma-light-blue-20px'
            }
          >
            {'Batterie: ' + props.item.battery + '%'}
          </div>
          <div
            className={
              props.item.beacon == null ? 'hidden' : 'axiforma-light-blue-20px'
            }
          >
            {'MAC: ' + props.item.beacon}
          </div>
        </div>
      </Popup>
      <Marker
        key={props.item.id}
        longitude={props.item.longitude}
        latitude={props.item.latitude}
        offsetLeft={-15}
        offsetTop={-30}
      >
        <OutsideAlerter value={false} setValue={togglePopup} detectDrag={true}>
          <button
            className={showPopup ? 'tracker tracker-animation' : 'tracker'}
            onClick={() => {
              togglePopup(!showPopup);
            }}
          >
            <img src={tracker} alt="Tracker" width={30} />
          </button>
        </OutsideAlerter>
      </Marker>
    </div>
  );
}
