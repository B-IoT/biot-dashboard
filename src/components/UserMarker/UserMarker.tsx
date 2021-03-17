import { Marker } from 'react-map-gl';
import './UserMarker.css';
import { Dispatch, SetStateAction, useEffect } from 'react';

function UserMarker(props: {
  userLon: number;
  userLat: number;
  setUserLon: Dispatch<SetStateAction<number>>;
  setUserLat: Dispatch<SetStateAction<number>>;
  setUserFetched: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (navigator.geolocation) {
      setInterval(
        () =>
          navigator.geolocation.getCurrentPosition(
            function (position) {
              props.setUserLon(position.coords.longitude);
              props.setUserLat(position.coords.latitude);
              props.setUserFetched(true);
            },
            () => null,
            //(e) => console.log('Geolocation failed ' + e.code + ' ' + e.message),
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 2000 }
          ),
        2000
      );
    }
  }, []);

  return (
    <Marker longitude={props.userLon} latitude={props.userLat}>
      <div className="user-container" />
      <div className="user-animation" />
      <div className="user-marker" />
    </Marker>
  );
}

export default UserMarker;
