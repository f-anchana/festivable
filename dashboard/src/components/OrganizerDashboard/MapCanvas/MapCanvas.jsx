"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  FeatureGroup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import styles from "../../../app/(OrganizerDashboard)/map-builder/MapBuilder.module.scss";

/* Patch icônes défaut (Next JS) */
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina.src ?? iconRetina,
  iconUrl:       icon.src       ?? icon,
  shadowUrl:     shadow.src     ?? shadow,
});



function RecenterOnChange({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 0.8 });
  }, [center, map]);
  return null;
}

function DrawControls({ polygon, setPolygon }) {
  const map   = useMap();
  const fgRef = useRef(null);

  /* 2-a. installer les boutons */
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    const draw = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: false,
          shapeOptions: { color: "#1e88e5" },
        },
        rectangle: false,
        circle: false,
        polyline: false,
        marker: false,
        circlemarker: false,
      },
      edit: { featureGroup: fg, remove: true, edit: false },
    });
    map.addControl(draw);

    /* Création d’un nouveau polygone */
    map.on("draw:created", (e) => {
      if (e.layerType !== "polygon") return;
      fg.clearLayers();                 // garder un seul polygone
      fg.addLayer(e.layer);
      const coords = e.layer.getLatLngs()[0].map((p) => [p.lat, p.lng]);
      setPolygon(coords);
    });

    /* Suppression */
    map.on("draw:deleted", () => setPolygon([]));

    return () => {
      map.off();
      map.removeControl(draw);
    };
  }, [map, setPolygon]);

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.clearLayers();
    if (polygon.length >= 3) {
      fg.addLayer(L.polygon(polygon, { color: "#1e88e5" }));
    }
  }, [polygon]);

  return <FeatureGroup ref={fgRef} />;
}

export default function MapCanvas({ center, polygon, setPolygon }) {
  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom
      className={styles.map}   /* flex:1; min-width:0; height:600px */
    >
      <RecenterOnChange center={center} />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={center} />

      <DrawControls polygon={polygon} setPolygon={setPolygon} />
    </MapContainer>
  );
}
