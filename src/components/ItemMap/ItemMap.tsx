import React, { useEffect, useMemo, useState } from 'react';
import './ItemMap.css';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { useQuery } from 'react-query';
// import { getItems } from '../../api/items';

import ReactMapGl, { FlyToInterpolator } from 'react-map-gl';
import { Item, itemExamples } from '../../utils/items';
import MapMarker from '../MapMarker/MapMarker';
import RoundButton from '../RoundButton/RoundButton';
import RoundInput from '../RoundInput/RoundInput';

import mapboxgl from 'mapbox-gl';
import UserMarker from '../UserMarker';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!../../../node_modules/mapbox-gl/dist/mapbox-gl-csp-worker').default;

const flyToOperator = new FlyToInterpolator({ speed: 6 });

function ItemMap(props: { itemName: string }) {
  const [userLon, setUserLon] = useState(0);
  const [userLat, setUserLat] = useState(0);
  const [floor, setFloor] = useState(0);
  const [itemsFetched, setItemsFetched] = useState(false);
  const [items, setItems] = useState([] as Item[]);
  const [viewport, setViewport] = useState({
    latitude: 46.440896,
    longitude: 6.891924,
    zoom: 19,
    maxZoom: 22,
    minZoom: 17,
    mapStyle: 'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g',
  } as any);

  useEffect(() => {
    // Get user geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLon(position.coords.longitude);
          setUserLat(position.coords.latitude);
        },
        // () => null,
        (e) => alert('Geolocation failed ' + e.code + ' ' + e.message),
        {
          maximumAge: 60000,
          timeout: 2000,
          enableHighAccuracy: false,
        }
      );
    }
  }, []);

  const centerHandler = () => {
    let newViewport = { ...viewport };
    newViewport.latitude = userLat;
    newViewport.longitude = userLon;
    newViewport.transitionDuration = 'auto';
    newViewport.transitionInterpolator = flyToOperator;
    setViewport(newViewport);
  };

  const zoomHandler = () => {
    let newViewport = { ...viewport };
    newViewport.zoom = Math.min(newViewport.zoom + 1, newViewport.maxZoom);
    newViewport.transitionDuration = 'auto';
    newViewport.transitionInterpolator = flyToOperator;
    setViewport(newViewport);
  };

  const dezoomHandler = () => {
    let newViewport = { ...viewport };
    newViewport.zoom = Math.max(newViewport.zoom - 1, newViewport.minZoom);
    newViewport.transitionDuration = 'auto';
    newViewport.transitionInterpolator = flyToOperator;
    setViewport(newViewport);
  };

  if (!itemsFetched) {
    setItemsFetched(true);
    const filterItems = itemExamples.filter(
      (item: Item) =>
        item.longitude != null &&
        item.latitude != null &&
        item.category === props.itemName
    );
    setItems(filterItems);
    const latitude =
      filterItems
        .map((item: Item) => item.latitude)
        .reduce((acc: number, lat: number) => acc + lat) / filterItems.length;
    const longitude =
      filterItems
        .map((item: Item) => item.longitude)
        .reduce((acc: number, lon: number) => acc + lon) / filterItems.length;

    let newViewport = { ...viewport };
    newViewport.latitude = latitude;
    newViewport.longitude = longitude;
    setViewport(newViewport);
  }

  // const { data } = useQuery('items', getItems); //, { refetchInterval: 3000 });
  //
  // useEffect(() => {
  //   if (data !== undefined) {
  //     const filterItems = data.filter(
  //       (item: Item) =>
  //         item.longitude != null &&
  //         item.latitude != null &&
  //         item.category === props.itemName,
  //     );
  //     if (filterItems.length > 0) {
  //       setItems(getPrettyItems(filterItems));
  //       setItemsFetched(true);
  //
  //       const latitude = filterItems
  //         .map((item: Item) => item.latitude)
  //         .reduce((acc: number, lat: number) => acc + lat) / filterItems.length;
  //       const longitude = filterItems
  //         .map((item: Item) => item.longitude)
  //         .reduce((acc: number, lon: number) => acc + lon) / filterItems.length;
  //
  //       let newViewport = { ...viewport };
  //       newViewport.latitude = latitude;
  //       newViewport.longitude = longitude;
  //       setViewport(newViewport);
  //     }
  //   }
  // }, [data]);

  const markers = useMemo(
    () =>
      items
        .filter((item) => item.floor === floor)
        .map((item) => <MapMarker key={item.id} item={item} />),
    [items, floor]
  );

  return (
    <div className="map-total-container">
      <div className="map-control-left">
        <RoundButton
          iconPath={'navbarIcons/floorUp.svg'}
          onClickHandler={() => setFloor(floor + 1)}
        />
        <RoundInput input={floor} setInput={setFloor} />
        <RoundButton
          iconPath={'navbarIcons/floorDown.svg'}
          onClickHandler={() => setFloor(floor - 1)}
        />
      </div>

      <div className="map-container">
        <div className="map-mask">
          <ReactMapGl
            {...viewport}
            width="90vw"
            height="100vh"
            className={itemsFetched ? 'map' : 'hidden'}
            onViewportChange={setViewport}
            mapStyle={
              'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g'
            }
          >
            {markers}
            <UserMarker longitude={userLon} latitude={userLat} />
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

      <div className="map-control-right">
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
