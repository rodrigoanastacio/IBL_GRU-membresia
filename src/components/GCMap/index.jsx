import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import customIconUrl from "../../assets/pin.svg";
import userIconUrl from "/user-location.svg";
import L from "leaflet";
import "./styles.scss";

const customIcon = L.icon({
  iconUrl: customIconUrl,
  iconSize: [82, 92],
  iconAnchor: [41, 92],
  popupAnchor: [0, -92],
});

const userIcon = L.icon({
  iconUrl: userIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const GCMap = ({ userLocation, nearestGCs }) => {
  return (
    <div className="c-gc-map">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>Sua localização</Popup>
        </Marker>

        {nearestGCs.map((gc) => (
          <Marker
            key={gc.id}
            position={[gc.coordinates.lat, gc.coordinates.lng]}
            icon={customIcon}
          >
            <Popup>
              <strong>{gc.title}</strong>
              <br />
              Líderes: {gc.leaders}
              <br />
              Distância: {gc.distance.toFixed(1)}km
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
