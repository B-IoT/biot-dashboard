import React from 'react';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';

/**
 * @param {object} props
 * @param {object[]} props.items the items to display on the map
 */
export default function ItemsMap({ items }) {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  });

  const source = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: items.map((item) => ({
        type: 'Feature',
        properties: {
          ...item,
        },
        geometry: {
          type: 'Point',
          coordinates: [item.longitude, item.latitude],
        },
      })),
    },
  };
  console.log(JSON.stringify(source));

  return (
    <Map
      style="mapbox://styles/gondolav/ckg3j2q4h1qg019k8sdyhkvvy"
      containerStyle={{
        width: '50vw',
        height: '90vh',
        margin: 'auto',
      }}
      center={[6.6323, 46.5197]}
    >
      {/* <Source id="items" geoJsonSource={JSON.stringify(source)} /> */}
      <Layer
        type="symbol"
        id="items"
        geoJSONSourceOptions={JSON.stringify(source)}
        layout={{ 'icon-image': 'hospital-15', 'icon-allow-overlap': true }}
      />
    </Map>
  );
}
