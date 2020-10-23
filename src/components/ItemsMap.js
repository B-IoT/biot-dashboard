import React, { useState, useEffect } from 'react';
import ReactMapboxGl, {
  Feature,
  Layer,
  Popup,
  ZoomControl,
} from 'react-mapbox-gl';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  popupTitle: {
    color: '#3f618c',
    fontWeight: 400,
    padding: '5px',
  },
}));

function ItemPopup({ item }) {
  const classes = useStyles();

  return (
    <Typography className={classes.popupTitle} gutterBottom>
      ({item.longitude}, {item.latitude})
    </Typography>
  );
}

/**
 * @param {object} props
 * @param {object[]} props.items the items to display on the map
 * @param {number} props.index
 */
export default function ItemsMap({ items, index }) {
  const [center, setCenter] = useState([6.6323, 46.5197]);
  const [zoom, setZoom] = useState([11]);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const theme = useTheme();

  const onToggleHover = (cursor, map) => {
    map.getCanvas().style.cursor = cursor;
  };

  const onDrag = () => {
    if (selectedItem) {
      setSelectedItem(undefined);
    }
  };

  const onMarkerClick = (item, feature) => {
    setCenter(feature.geometry.coordinates);
    setZoom([14]);
    setSelectedItem(item);
  };

  const flyToOptions = {
    speed: 0.8,
  };

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    minZoom: 8,
    maxZoom: 15,
  });

  return (
    <Map
      style="mapbox://styles/gondolav/ckg3j2q4h1qg019k8sdyhkvvy"
      containerStyle={{
        width: '30vw',
        height: '90vh',
      }}
      center={center}
      zoom={zoom}
      onDrag={onDrag}
      flyToOptions={flyToOptions}
    >
      <Layer
        type="symbol"
        id="items"
        layout={{ 'icon-image': 'marker-15', 'icon-allow-overlap': true }}
      >
        {items.map((item) => (
          <Feature
            coordinates={[item.latitude, item.longitude]}
            onMouseEnter={({ map }) => onToggleHover('pointer', map)}
            onMouseLeave={({ map }) => onToggleHover('', map)}
            onClick={({ feature }) => onMarkerClick(item, feature)}
          />
        ))}
      </Layer>
      {selectedItem && (
        <Popup coordinates={[selectedItem.latitude, selectedItem.longitude]}>
          <ItemPopup
            item={selectedItem}
            style={{ borderRadius: theme.borderRadius }}
          />
        </Popup>
      )}
      <ZoomControl />
    </Map>
  );
}
