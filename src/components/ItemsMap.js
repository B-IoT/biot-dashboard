import React from 'react';
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
    fontWeight: 400,
    fontSize: 10,
    padding: '2px',
  },
}));

function ItemPopup({ item }) {
  const classes = useStyles();

  return (
    <Typography className={classes.popupTitle}>
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
  const theme = useTheme();

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    minZoom: 8,
  });

  let popups;
  if (index !== -1) {
    const item = items[index];
    popups = (
      <Popup coordinates={[item.longitude, item.latitude]}>
        <ItemPopup item={item} style={{ borderRadius: theme.borderRadius }} />
      </Popup>
    );
  } else {
    popups = items.map((item) => (
      <Popup key={item.id} coordinates={[item.longitude, item.latitude]}>
        <ItemPopup item={item} style={{ borderRadius: theme.borderRadius }} />
      </Popup>
    ));
  }

  return (
    <Map
      style="mapbox://styles/gondolav/ckg3j2q4h1qg019k8sdyhkvvy"
      containerStyle={{
        width: '40vw',
        height: '78vh',
      }}
      center={[6.891924, 46.440896]}
      zoom={[18]}
    >
      <Layer
        type="symbol"
        id="items"
        layout={{ 'icon-image': 'marker-15', 'icon-allow-overlap': true }}
      >
        {items.map((item) => (
          <Feature
            key={item.id}
            coordinates={[item.longitude, item.latitude]}
          />
        ))}
      </Layer>
      {/* {popups} */}
      <ZoomControl />
    </Map>
  );
}
