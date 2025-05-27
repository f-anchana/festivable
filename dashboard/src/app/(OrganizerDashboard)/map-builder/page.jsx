// app/(OrganizerDashboard)/map-setup/page.jsx
"use client";

import { useState } from "react";
import AddressSearch from "../../../components/OrganizerDashboard/AddressSearch/AddressSearch";
import CoordinatesSearch from "../../../components/OrganizerDashboard/CoordinatesSearch/CoordinatesSearch";
import MapCanvas from "../../../components/OrganizerDashboard/MapCanvas/MapCanvas";
import styles from "./MapBuilder.module.scss";

export default function MapSetupPage() {
  const [center, setCenter] = useState([48.8566, 2.3522]); // Paris par défaut
  const [polygon, setPolygon] = useState([]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Paramétrez la carte de votre festival</h1>
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
      <MapCanvas center={center} polygon={polygon} setPolygon={setPolygon} />
      <div>
        <h2>Ajoutez les points d’intérêt : </h2>
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
    </div>
  );
}
