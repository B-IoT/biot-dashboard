import React from 'react';
import { Link } from 'react-router-dom';
import './MapPage.css';

function MapPage(props) {
  const {
    backtext,
    ecgtitle,
    maplight,
    mapshadow,
    maprimlight,
    map,
    caption1,
    caption2,
    caption3,
  } = props;

  return (
    <div class="map-page">
      <Link to="/search">
        <div className="back-button">
          <div className="back-shadow" />
          <div className="back-light" />
          <div className="back-text axiforma-book-normal-blue-30px">
            {backtext}
          </div>
        </div>
      </Link>
      <div className="auto-flex2">
        <div className="ecg-title axiforma-bold-blue-70px">{ecgtitle}</div>
        <div className="overlap-group2">
          <div className="map">
            <img className="map-item" src={maplight} />
            <img className="map-item" src={mapshadow} />
            <img className="map-rim-light" src={maprimlight} />
            <img className="map-item" src={map} />
          </div>
          <div className="green-tracker border-3px-caribbean-green" />
          <div className="orange-tracker border-3px-pomegranate" />
          <div className="blue-tracker4 border-3px-blue" />
          <div className="blue-tracker3 border-3px-blue" />
          <div className="blue-tracker2 border-3px-blue" />
          <div className="blue-tracker1 border-3px-blue" />
        </div>
      </div>
      <div className="auto-flex1">
        <div className="caption-tracker1 border-3px-blue" />
        <div className="caption-tracker2 border-3px-pomegranate" />
        <div className="caption-tracker3 border-3px-caribbean-green" />
      </div>
      <div className="auto-flex22">
        <div className="caption1 axiforma-medium-dove-gray-25px">
          {caption1}
        </div>
        <div className="caption2 axiforma-medium-dove-gray-25px">
          {caption2}
        </div>
        <div className="caption3 axiforma-medium-dove-gray-25px">
          {caption3}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
