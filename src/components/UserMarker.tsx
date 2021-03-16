import { Marker } from 'react-map-gl';
import tracker from '../img/marker.svg';

export default function UserMarker(props: {
  longitude: number;
  latitude: number;
}) {
  return (
    <Marker
      longitude={props.longitude}
      latitude={props.latitude}
      offsetLeft={-15}
      offsetTop={-30}
    >
      <img src={tracker} alt="Tracker" width={30} />
    </Marker>
  );
}
