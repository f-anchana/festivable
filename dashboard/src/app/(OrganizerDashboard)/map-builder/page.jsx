// app/(OrganizerDashboard)/map-setup/page.jsx
"use client";

import { useState, useEffect } from "react";
import AddressSearch from "../../../components/OrganizerDashboard/MapBuilder/AddressSearch/AddressSearch";
import CoordinatesSearch from "../../../components/OrganizerDashboard/MapBuilder/CoordinatesSearch/CoordinatesSearch";
import MapCanvas from "../../../components/OrganizerDashboard/MapBuilder/MapCanvasWrapper/MapCanvasWrapper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IconPalette from "../../../components/OrganizerDashboard/IconPalette/IconPalette";
import styles from "./MapBuilder.module.scss";

export default function MapSetupPage() {
  const [center, setCenter] = useState(null);
  const [polygonStyle, setPolygonStyle] = useState({
    color: "#1e88e5",
    fillColor: "transparent",
    fillOpacity: 0.1,
  });

  const [polygons, setPolygons] = useState([]);
  const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);
  const [festivalId, setFestivalId] = useState(null);

  useEffect(() => {
    const fetchFestival = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-festival`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok)
          throw new Error("Erreur lors de la récupération du festival");

        const data = await res.json();
        setFestivalId(data._id);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFestival();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h2>Paramétrez la carte de votre festival</h2>
        <p>
          Pour afficher correctement votre événement sur la carte, veuillez
          renseigner <strong>l’adresse exacte</strong> ou{" "}
          <strong>les coordonnées GPS du lieu.</strong> Cela permet de garantir
          une localisation précise et une navigation fluide pour tous les
          visiteurs.
        </p>
      </div>
      <div className={styles.searchContainer}>
        <AddressSearch
          onSelect={(coords /* [lat,lng] */) => setCenter(coords)}
        />
        <CoordinatesSearch
          onSelect={(coords /* [lat,lng] */) => setCenter(coords)}
        />
      </div>
      <div>
        <h3>Ajoutez les points d’intérêt : </h3>
        <p>
          Sur le côté de la carte, vous trouverez plusieurs icônes représentant
          des équipements clés :
        </p>
        <br />
        <p>
          <strong>
            Toilettes / Zones accessibles PMR / Espaces restauration / Parkings
          </strong>
          , etc.
        </p>
        <br />
        <p>
          Ces éléments sont déplaçables par glisser-déposer. <br />
          Il vous suffit de les positionner à l’endroit exact sur la carte. Ils
          seront enregistrés automatiquement et mis à jour sur le site public.
        </p>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex"}}>
          <MapCanvas
            center={center}
            setCenter={setCenter}
            polygons={polygons}
            setPolygons={setPolygons}
            selectedPolygonIndex={selectedPolygonIndex}
            setSelectedPolygonIndex={setSelectedPolygonIndex}
            festivalId={festivalId}
          />
          {center && (
            <IconPalette
              center={center}
              polygonStyle={polygonStyle}
              setPolygonStyle={setPolygonStyle}
            />
          )}
        </div>
      </DndProvider>
    </div>
  );
}
