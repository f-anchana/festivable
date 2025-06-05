'use client';

import { useState } from "react";
import styles from "../../../../app/(OrganizerDashboard)/map-builder/MapBuilder.module.scss";

// Regex pour format décimal : ex. "47.0958, -1.2681"
const decimalReg = /^\s*([+-]?\d+(?:[.,]\d+)?)\s*[,; ]\s*([+-]?\d+(?:[.,]\d+)?)\s*$/i;

// Regex pour format DMS : ex. "47° 05′ 45″ nord, 1° 16′ 05″ ouest"
const dmsReg = /^\s*(\d{1,3})[°\s]*\s*(\d{1,2})[\s'′]?\s*(\d{1,2}(?:\.\d+)?)?[\s"″”]*\s*(n|s|nord|sud)\s*[,; ]\s*(\d{1,3})[°\s]*\s*(\d{1,2})[\s'′]?\s*(\d{1,2}(?:\.\d+)?)?[\s"″”]*\s*(e|w|est|ouest)\s*$/i;

// Convertit DMS en décimal
function dmsToDec(deg, min, sec = 0, hemi = "") {
  deg = parseFloat(deg);
  min = parseFloat(min);
  sec = parseFloat(sec || 0);
  let dec = deg + min / 60 + sec / 3600;
  hemi = hemi.toLowerCase();
  if (["s", "sud", "w", "ouest"].includes(hemi)) dec *= -1;
  return dec;
}

// Nettoie les caractères typographiques
function cleanInput(str) {
  return str
    .replace(/[′’‘]/g, "'")
    .replace(/[″“”]/g, '"')
    .replace(/,/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function CoordinatesSearch({ onSelect }) {
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const raw = query.trim();
    const q = cleanInput(raw);

    // Format décimal
    const dec = q.match(decimalReg);
    if (dec) {
      const lat = parseFloat(dec[1].replace(',', '.'));
      const lng = parseFloat(dec[2].replace(',', '.'));
      if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
        onSelect([lat, lng], `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      } else {
        alert("Coordonnées décimales hors limites.");
      }
      return;
    }

    // Format DMS
    const dms = q.match(dmsReg);
    if (dms) {
      const lat = dmsToDec(dms[1], dms[2], dms[3] || 0, dms[4]);
      const lng = dmsToDec(dms[5], dms[6], dms[7] || 0, dms[8]);
      onSelect([lat, lng], raw);
      return;
    }

    alert("Format non reconnu. Utilisez 'lat,lng' ou 'DMS' (ex : 47° 05′ 45″ nord, 1° 16′ 05″ ouest)");
  }

  return (
    <div className={styles.searchBox}>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Coordonnées (lat,lng ou DMS)"
        />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}
