"use client";

import { useEffect, useRef, useState } from "react";
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
import { useDrop } from "react-dnd";
import styles from "../../../app/(OrganizerDashboard)/map-builder/MapBuilder.module.scss";
import CopyMapLinkButton from "../../OrganizerDashboard/CopyMapLinkButton/CopyMapLinkButton";

import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina.src ?? iconRetina,
  iconUrl: icon.src ?? icon,
  shadowUrl: shadow.src ?? shadow,
});

function RecenterOnChange({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 0.8 });
  }, [center, map]);
  return null;
}

function DropHandler({ onDrop }) {
  const map = useMap();
  const ref = useRef(null);

  const [, drop] = useDrop(
    () => ({
      accept: "ICON",
      drop: (item, monitor) => {
        const offset = monitor.getClientOffset();
        if (!offset || !ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        const x = offset.x - bounds.left;
        const y = offset.y - bounds.top;
        const latlng = map.containerPointToLatLng([x, y]);
        onDrop(item.type, latlng);
      },
    }),
    [map]
  );

  useEffect(() => {
    const container = map.getContainer();
    if (container) {
      drop(container);
      ref.current = container;
    }
  }, [drop, map]);

  return null;
}

function DrawControls({ polygons, setPolygons, setSelectedPolygonIndex }) {
  const map = useMap();
  const fgRef = useRef(null);

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    const draw = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: "#1e88e5",
            fillColor: "#1e88e5",
            fillOpacity: 0.3,
            weight: 2,
          },
        },
        rectangle: false,
        circle: false,
        polyline: false,
        marker: false,
        circlemarker: false,
      },
    });

    map.addControl(draw);

    const handleCreated = (e) => {
      if (e.layerType !== "polygon") return;
      const coords = e.layer.getLatLngs()[0].map((p) => [p.lat, p.lng]);
      setPolygons((prev) => [
        ...prev,
        {
          coords,
          style: {
            color: "#1e88e5",
            fillColor: "#1e88e5",
            fillOpacity: 0.3,
            weight: 2,
          },
          name: "",
        },
      ]);
    };

    map.on("draw:created", handleCreated);

    return () => {
      map.off("draw:created", handleCreated);
      map.removeControl(draw);
    };
  }, [map, setPolygons]);

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    fg.clearLayers();

    polygons.forEach((polygon, i) => {
      const layer = L.polygon(polygon.coords, polygon.style);
      layer.on("click", () => setSelectedPolygonIndex(i));
      if (polygon.name) {
        const center = L.polygon(polygon.coords).getBounds().getCenter();
        const tooltip = L.tooltip(center, {
          permanent: true,
          direction: "center",
          className: "polygon-label",
          offset: [0, 0],
        }).setContent(polygon.name);
        layer.bindTooltip(tooltip);
      }
      fg.addLayer(layer);
    });
  }, [polygons, setSelectedPolygonIndex]);

  return <FeatureGroup ref={fgRef} />;
}

export default function MapCanvas({
  center,
  polygons,
  setPolygons,
  selectedPolygonIndex,
  setSelectedPolygonIndex,
  festivalId,
}) {
  const [icons, setIcons] = useState([]);

  const handleDrop = (type, latlng) => {
    setIcons((prev) => [...prev, { type, latlng }]);
  };

  const getIcon = (type) =>
    new L.Icon({
      iconUrl: `/icones/map-builder/${type}.svg`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

  const handleStyleChange = (key, value) => {
    if (selectedPolygonIndex === null) return;
    setPolygons((prev) =>
      prev.map((poly, i) =>
        i === selectedPolygonIndex
          ? { ...poly, style: { ...poly.style, [key]: value } }
          : poly
      )
    );
  };

  const handleNameChange = (value) => {
    if (selectedPolygonIndex === null) return;
    setPolygons((prev) =>
      prev.map((poly, i) =>
        i === selectedPolygonIndex ? { ...poly, name: value } : poly
      )
    );
  };

  const handleDeletePolygon = () => {
    if (selectedPolygonIndex === null) return;
    setPolygons((prev) => prev.filter((_, i) => i !== selectedPolygonIndex));
    setSelectedPolygonIndex(null);
  };

  const saveMap = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/map`, {
        method: "PUT", // ou POST si tu veux toujours recréer
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          festivalId,
          center,
          zoom: 15,
          polygons,
          icons,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur inconnue");
      }

      alert("✅ Carte enregistrée avec succès !");
    } catch (err) {
      alert("❌ Erreur lors de la sauvegarde : " + err.message);
    }
  };

  if (!center) {
    return (
      <div
        style={{
          height: 300,
          width: "100%",
          background: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#333",
          borderRadius: 6,
        }}
      >
        Veuillez renseigner l’adresse ou les coordonnées GPS du lieu
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom
        className={styles.map}
      >
        <RecenterOnChange center={center} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} />
        <DrawControls
          polygons={polygons}
          setPolygons={setPolygons}
          setSelectedPolygonIndex={setSelectedPolygonIndex}
        />
        <DropHandler onDrop={handleDrop} />
        {icons.map((m, i) => (
          <Marker
            key={i}
            position={m.latlng}
            icon={getIcon(m.type)}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const newLatLng = e.target.getLatLng();
                setIcons((prev) =>
                  prev.map((icon, index) =>
                    index === i ? { ...icon, latlng: newLatLng } : icon
                  )
                );
              },
              contextmenu: () => {
                setIcons((prev) => prev.filter((_, index) => index !== i));
              },
            }}
          />
        ))}
      </MapContainer>

      {selectedPolygonIndex !== null && (
        <div
          style={{
            marginTop: 8,
            background: "#fff",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 4,
            fontSize: 14,
          }}
        >
          <p style={{ marginBottom: 4 }}>
            🎨 Modifier le polygone sélectionné :
          </p>
          <label>
            Nom :
            <input
              type="text"
              value={polygons[selectedPolygonIndex]?.name || ""}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Nom de la zone (optionnel)"
              style={{ marginLeft: 8 }}
            />
          </label>
          <br />
          <label>
            Couleur :
            <input
              type="color"
              value={
                polygons[selectedPolygonIndex]?.style?.fillColor || "#1e88e5"
              }
              onChange={(e) => {
                handleStyleChange("fillColor", e.target.value);
                handleStyleChange("color", e.target.value);
              }}
              style={{ marginLeft: 8 }}
            />
          </label>
          <br />
          <label>
            Opacité :
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={polygons[selectedPolygonIndex]?.style?.fillOpacity ?? 0.3}
              onChange={(e) =>
                handleStyleChange("fillOpacity", parseFloat(e.target.value))
              }
              style={{ marginLeft: 8 }}
            />
          </label>
          <br />
          <button
            onClick={handleDeletePolygon}
            style={{
              marginTop: 8,
              color: "white",
              background: "red",
              border: "none",
              padding: "4px 8px",
              borderRadius: 4,
            }}
          >
            Supprimer ce polygone
          </button>
        </div>
      )}

      <button
        onClick={saveMap}
        style={{
          marginTop: 12,
          backgroundColor: "#1e88e5",
          color: "#fff",
          padding: "10px 16px",
          fontSize: 14,
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        💾 Sauvegarder la carte
      </button>
      <CopyMapLinkButton festivalId={festivalId} />
    </div>
  );
}
