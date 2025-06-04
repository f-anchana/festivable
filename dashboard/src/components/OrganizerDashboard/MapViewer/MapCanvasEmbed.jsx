'use client';

import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function MapCanvasEmbed({ mapData }) {
  if (!mapData) return <p>Chargement de la carte...</p>;

  const { center, zoom, polygons, icons } = mapData;

  const getIcon = (type) =>
    new L.Icon({
      iconUrl: `/icones/map-builder/${type}.svg`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: 300, width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center} />
      {polygons?.map((poly, i) => (
        <Polygon key={i} positions={poly.coords} pathOptions={poly.style} />
      ))}
      {icons?.map((icon, i) => (
        <Marker key={i} position={icon.latlng} icon={getIcon(icon.type)} />
      ))}
    </MapContainer>
  );
}
