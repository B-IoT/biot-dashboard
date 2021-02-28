import React, { useEffect, useState } from 'react';
import './ItemMap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useQuery } from 'react-query';
import { getItems } from '../../api/items';

import ReactMapGl, { Marker } from 'react-map-gl';
import { getPrettyItems } from '../../utils/items';
import tracker from '../../img/marker.svg';

function ItemMap() {
  const [viewport, setViewport] = React.useState({
    width: '80vw',
    height: '80vh',
    latitude: 46.440896,
    longitude: 6.891924,
    zoom: 19,
    maxZoom: 21,
    minZoom: 10,
    mapStyle: 'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g',
  });

  const demoItems = getPrettyItems([
    {
      beaconId: '1',
      status: 'available',
      battery: 94,
      latitude: 46.440896,
      longitude: 6.891924,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Oxygène',
      service: 'Bloc 1',
      id: 1,
    },
    {
      beaconId: '2',
      status: 'available',
      battery: 87,
      latitude: 46.44092,
      longitude: 6.891924,
      lastSeen: '2020-10-26T08:54:14',
      type: 'Lit',
      service: 'Bloc 1',
      id: 2,
    },
    {
      beaconId: '3',
      status: 'available',
      battery: 56,
      latitude: 46.44089,
      longitude: 6.891944,
      lastSeen: '2020-10-26T08:54:14',
      type: 'ECG',
      service: 'Bloc 1',
      id: 3,
    },
  ]);

  const [items, setItems] = useState(demoItems);
  //const { data } = useQuery('items', getItems);

  // useEffect(() => {
  //   if (data) {
  //     setItems(data);
  //   }
  // }, [data]);

  const markers = React.useMemo(
    () =>
      items.map((item) => (
        <Marker
          key={item.id}
          longitude={item.longitude}
          latitude={item.latitude}
          offsetLeft={-15}
          offsetTop={-30}
        >
          <img src={tracker} alt="Tracker" width={30} />
        </Marker>
      )),
    [items]
  );

  return (
    <div className="map-container">
      <div className="map-mask">
        <ReactMapGl
          {...viewport}
          className="map"
          onViewportChange={setViewport}
          mapStyle={'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g'}
        >
          {markers}
        </ReactMapGl>
        <div className="mask-edges clear" />
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
