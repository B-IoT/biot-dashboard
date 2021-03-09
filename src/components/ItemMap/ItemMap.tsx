import React, { useEffect, useMemo, useState } from 'react';
import './ItemMap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { useQuery } from 'react-query';
// import { getItems } from '../../api/items';

import ReactMapGl from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { getPrettyItems, Item } from '../../utils/items';
import MapMarker from '../MapMarker/MapMarker';
import RoundButton from '../RoundButton/RoundButton';
import RoundInput from '../RoundInput/RoundInput';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!../../../node_modules/mapbox-gl/dist/mapbox-gl-csp-worker').default;

function ItemMap(props: { itemName: string }) {
  const [centerLatitude, setCenterLatitude] = useState(46.440896);
  const [centerLongitude, setCenterLongitude] = useState(6.891924);
  const [floor, setFloor] = useState(0);
  const [itemsFetched, setItemsFetched] = useState(false);
  const [items, setItems] = useState([] as Item[]);
  const [viewport, setViewport] = useState({
    width: '90vw',
    height: '100vh',
    latitude: centerLatitude,
    longitude: centerLongitude,
    zoom: 19,
    maxZoom: 22,
    minZoom: 17,
    mapStyle: 'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g',
  });

  const data = getPrettyItems([
    {
      id: 1,
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 2,
      category: 'Oxygène',
      status: 'available',
      battery: 94,
      latitude: 46.440896,
      longitude: 6.891924,
      timestamp: '2020-10-26T08:54:14',
      service: 'Bloc 1',
    },
    {
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 0,
      timestamp: '2020-10-26T08:54:14',
      status: 'available',
      battery: 87,
      latitude: 46.44092,
      longitude: 6.891924,
      category: 'Lit',
      service: 'Bloc 1',
      id: 2,
    },
    {
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 1,
      timestamp: '2020-10-26T08:54:14',
      status: 'available',
      battery: 56,
      latitude: 46.44089,
      longitude: 6.891944,
      category: 'ECG',
      service: 'Bloc 1',
      id: 3,
    },
    {
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 2,
      timestamp: '2020-10-26T08:54:14',
      category: 'Oxygène',
      status: 'needMaintenance',
      battery: 20,
      latitude: 46.44099,
      longitude: 6.891984,
      service: 'Bloc 1',
      id: 4,
    },
    {
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 0,
      timestamp: '2020-10-26T08:54:14',
      category: 'Lit',
      status: 'unavailable',
      battery: 0,
      latitude: 46.44079,
      longitude: 6.891984,
      service: 'Bloc 2',
      id: 5,
    },
    {
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 1,
      timestamp: '2020-10-26T08:54:14',
      category: 'Lit',
      status: 'available',
      battery: 12,
      latitude: 46.44089,
      longitude: 6.891684,
      service: 'Bloc 2',
      id: 6,
    },
    {
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 2,
      timestamp: '2020-10-26T08:54:14',
      category: 'ECG',
      status: 'available',
      battery: 12,
      latitude: 46.440898,
      longitude: 6.892268,
      service: 'Bloc 2',
      id: 7,
    },
    {
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 1,
      timestamp: '2020-10-26T08:54:14',
      category: 'ECG',
      status: 'needMaintenance',
      battery: 20,
      latitude: 46.441019,
      longitude: 6.891783,
      service: 'Bloc 2',
      id: 8,
    },
    {
      beacon: 'aa:aa:aa:aa:aa:aa',
      floor: 0,
      timestamp: '2020-10-26T08:54:14',
      id: 9,
      category: 'ECG',
      status: 'available',
      battery: 73,
      latitude: 46.440754,
      longitude: 6.892197,
      service: 'Bloc 2',
    },
  ]);

  if (!itemsFetched) {
    setItemsFetched(true);
    const filterItems = data.filter(
      (item: Item) =>
        item.longitude != null &&
        item.latitude != null &&
        item.category === props.itemName
    );
    setItems(getPrettyItems(filterItems));
    setCenterLatitude(
      filterItems
        .map((item: Item) => item.latitude)
        .reduce((acc: number, lat: number) => acc + lat) / filterItems.length
    );
    setCenterLongitude(
      filterItems
        .map((item: Item) => item.longitude)
        .reduce((acc: number, lon: number) => acc + lon) / filterItems.length
    );
  }

  // const { data } = useQuery('items', getItems); //, { refetchInterval: 3000 });
  //
  // useEffect(() => {
  //   if (data !== undefined) {
  //     const filterItems = data.filter(
  //       (item: Item) =>
  //         item.longitude != null &&
  //         item.latitude != null &&
  //         item.category === props.itemName
  //     );
  //     if (filterItems.length > 0) {
  //       setItems(getPrettyItems(filterItems));
  //       setItemsFetched(true);
  //       setCenterLatitude(
  //         filterItems
  //           .map((item: Item) => item.latitude)
  //           .reduce((acc: number, lat: number) => acc + lat) /
  //           filterItems.length
  //       );
  //       setCenterLongitude(
  //         filterItems
  //           .map((item: Item) => item.longitude)
  //           .reduce((acc: number, lon: number) => acc + lon) /
  //           filterItems.length
  //       );
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    let newViewport = { ...viewport };
    newViewport.latitude = centerLatitude;
    newViewport.longitude = centerLongitude;
    setViewport(newViewport);
  }, [centerLatitude, centerLongitude]);

  const markers = useMemo(
    () =>
      items
        .filter((item) => item.floor === floor)
        .map((item) => <MapMarker key={item.id} item={item} />),
    [items, floor]
  );

  const centerHandler = () => {
    let newViewport = { ...viewport };
    newViewport.latitude = centerLatitude;
    newViewport.longitude = centerLongitude;
    setViewport(newViewport);
  };

  const zoomHandler = () => {
    let newViewport = { ...viewport };
    newViewport.zoom = Math.min(newViewport.zoom + 1, newViewport.maxZoom);
    setViewport(newViewport);
  };

  const dezoomHandler = () => {
    let newViewport = { ...viewport };
    newViewport.zoom = Math.max(newViewport.zoom - 1, newViewport.minZoom);
    setViewport(newViewport);
  };

  const floorUpHandler = () => {
    setFloor(floor + 1);
  };

  const floorDownHandler = () => {
    setFloor(floor - 1);
  };

  return (
    <div className="map-total-container">
      <div className="map-control-left">
        <RoundButton
          iconPath={'navbarIcons/floorUp.svg'}
          onClickHandler={floorUpHandler}
        />
        <RoundInput input={floor} setInput={setFloor} />
        <RoundButton
          iconPath={'navbarIcons/floorDown.svg'}
          onClickHandler={floorDownHandler}
        />
      </div>

      <div className="map-container">
        <div className="map-mask">
          <ReactMapGl
            {...viewport}
            className={itemsFetched ? 'map' : 'hidden'}
            onViewportChange={setViewport}
            mapStyle={
              'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g'
            }
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

      <div className="map-control">
        <RoundButton
          iconPath={'navbarIcons/center.svg'}
          onClickHandler={centerHandler}
        />
        <div className="separator" />
        <RoundButton
          iconPath={'navbarIcons/zoom.svg'}
          onClickHandler={zoomHandler}
        />
        <RoundButton
          iconPath={'navbarIcons/dezoom.svg'}
          onClickHandler={dezoomHandler}
        />
      </div>
    </div>
  );
}

export default ItemMap;
