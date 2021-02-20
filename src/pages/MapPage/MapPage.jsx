import React from 'react';
import './MapPage.css';
import BackButton from '../../components/BackButton/BackButton';

function MapPage() {

  return (
    <div class="map-page">
      <BackButton/>
      <h1 className="axiforma-book-normal-blue-50px">
        {'Voici les ECG à proximité'}
      </h1>
      <div className="auto-flex2">
        <div className="overlap-group2">
          <div className="map">
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
          {"ECG"}
        </div>
        <div className="caption2 axiforma-medium-dove-gray-25px">
          {"ECG conseillé"}
        </div>
        <div className="caption3 axiforma-medium-dove-gray-25px">
          {"Votre position"}
        </div>
      </div>
    </div>
  );
}

export default MapPage;
