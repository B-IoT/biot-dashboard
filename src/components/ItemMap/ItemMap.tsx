import React, { useEffect, useMemo, useState } from 'react';
import './ItemMap.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapGl from 'react-map-gl';
import { getPrettyItems } from '../../utils/items';
import MapMarker from '../MapMarker/MapMarker';

function ItemMap(props: { itemName: string }) {
  const [viewport, setViewport] = useState({
    width: '80vw',
    height: '80vh',
    latitude: 46.440896,
    longitude: 6.891924,
    zoom: 19,
    maxZoom: 22,
    minZoom: 17,
    mapStyle: 'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g',
  });

  const demoItems = getPrettyItems([
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
      floor: 2,
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
      floor: 2,
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
      floor: 2,
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
      floor: 2,
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
      floor: 2,
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
      floor: 2,
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

  const itemsFetched = true;
  const items = demoItems.filter((item) => item.category === props.itemName);

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

////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useMemo, useState } from 'react';
// import './ItemMap.css';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { useQuery } from 'react-query';
// import { getItems } from '../../api/items';
//
// import ReactMapGl from 'react-map-gl';
// import { getPrettyItems, Item } from '../../utils/items';
// import MapMarker from '../MapMarker/MapMarker';
//
// function ItemMap(props: { itemName: string }) {
//   const [viewport, setViewport] = useState({
//     width: '80vw',
//     height: '80vh',
//     latitude: 46.440896,
//     longitude: 6.891924,
//     zoom: 19,
//     maxZoom: 22,
//     minZoom: 17,
//     mapStyle: 'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g',
//   });
//
//
//   const [itemsFetched, setItemsFetched] = useState(false);
//   const [items, setItems] = useState([] as Item[]);
//   const { data } = useQuery('items', getItems); //, { refetchInterval: 3000 });
//
//   useEffect(() => {
//     if (data) {
//       let filterItems = data.filter(
//         (item: Item) =>
//           item.longitude != null &&
//           item.latitude != null &&
//           item.category === props.itemName
//       );
//       if (filterItems.length > 0) {
//         setItems(getPrettyItems(filterItems));
//         setItemsFetched(true);
//       }
//     }
//   }, [data, props.itemName]);
//
//   useEffect(() => {
//     if (itemsFetched) {
//       let newViewport = { ...viewport };
//       newViewport.latitude =
//         items.map((item) => item.latitude).reduce((acc, lat) => acc + lat) /
//         items.length;
//       newViewport.longitude =
//         items.map((item) => item.longitude).reduce((acc, lon) => acc + lon) /
//         items.length;
//       setViewport(newViewport);
//     }
//   }, [itemsFetched]);
//
//   const markers = useMemo(
//     () => items.map((item) => <MapMarker key={item.id} item={item} />),
//     [items],
//   );
//
//   return (
//     <div className='map-container'>
//       <div className='map-mask'>
//         <ReactMapGl
//           {...viewport}
//           className={itemsFetched ? 'map' : 'hidden'}
//           onViewportChange={setViewport}
//           mapStyle={'mapbox://styles/ludohoffstetter/cklfuba923yaa17miwvtmd26g'}
//         >
//           {markers}
//         </ReactMapGl>
//         <div className='mask-edges clear' />
//         <div className='blurred-edges clear' />
//       </div>
//       <div className='map-blur clear'>
//         <div className='map-mask clear'>
//           <div className='map-ambient clear' />
//           <div className='map-shadow clear' />
//           <div className='map-light clear' />
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default ItemMap;
