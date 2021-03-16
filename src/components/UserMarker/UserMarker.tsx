import { Marker } from 'react-map-gl';
import './UserMarker.css';

export default function UserMarker(props: {
  longitude: number;
  latitude: number;
}) {
  return (
    <Marker longitude={props.longitude} latitude={props.latitude}>
      <div className="user-container" />
      <div className="user-animation" />
      <div className="user-marker" />
    </Marker>
  );
}
