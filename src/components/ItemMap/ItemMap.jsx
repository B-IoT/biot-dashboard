import React, { useEffect, useMemo, useState } from 'react';
import './ItemMap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useQuery } from 'react-query';
import { getItems } from '../../api/items';

import ReactMapGl from 'react-map-gl';
import { getPrettyItems } from '../../utils/items';
import MapMarker from '../MapMarker/MapMarker';

function ItemMap() {
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

  const [viewport, setViewport] = useState({
    width: '80vw',
    height: '80vh',
    latitude: 46.440896,
    longitude: 6.891924,
    zoom: 19,
    maxZoom: 21,
    minZoom: 10,
    mapStyle: 'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g',
  });

  // const [itemsFetched, setItemsFetched] = useState(true);
  // const [items, setItems] = useState(demoItems);

  const [itemsFetched, setItemsFetched] = useState(false);
  const [items, setItems] = useState([]);
  const { data } = useQuery('items', getItems); //, { refetchInterval: 3000 });

  useEffect(() => {
    if (data) {
      setItems(
        getPrettyItems(
          data.filter((item) => item.longitude != null && item.latitude != null)
        )
      );
      setItemsFetched(true);
    }
  }, [data]);

  useEffect(() => {
    if (itemsFetched) {
      let newViewport = { ...viewport };
      newViewport.latitude =
        items.map((item) => item.latitude).reduce((acc, lat) => acc + lat) /
        items.length;
      newViewport.longitude =
        items.map((item) => item.longitude).reduce((acc, lon) => acc + lon) /
        items.length;
      setViewport(newViewport);
    }
  }, [itemsFetched]);

  const markers = useMemo(
    () => items.map((item) => <MapMarker key={item.id} item={item} />),
    [items]
  );

  return (
    <div className="map-container">
      <div className="map-mask">
        <ReactMapGl
          {...viewport}
          className={itemsFetched ? 'map' : 'hidden'}
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
