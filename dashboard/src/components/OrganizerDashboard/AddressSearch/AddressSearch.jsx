'use client';

import { useState } from "react";
import styles from "../../../app/(OrganizerDashboard)/map-builder/MapBuilder.module.scss";

export default function AddressSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&q=" + encodeURIComponent(q);

    try {
      const res = await fetch(url);
      const json = await res.json();
      setResults(json);
    } catch (err) {
      console.error("Nominatim error:", err);
    }
  }

  return (
    <div className={styles.searchBox}>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une adresse"
        />
        <button type="submit">Valider</button>
      </form>

      {results.length > 0 && (
        <ul className={styles.results}>
          {results.slice(0, 5).map((r) => (
            <li
              key={r.place_id}
              onClick={() => {
                onSelect([+r.lat, +r.lon], r.display_name);
                setResults([]);
              }}
            >
              {r.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
