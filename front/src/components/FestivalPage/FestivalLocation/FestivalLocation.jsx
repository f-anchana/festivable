'use client';

import s from './FestivalLocation.module.scss';

export default function FestivalLocation({ location }) {
  if (!location) return <p>Localisation non disponible.</p>;

  return (
    <section aria-labelledby="location-title">
      <h2 id="location-title">Lieu</h2>
      <p>{location.address}</p>
      {/* Ici tu peux ajouter une map, iframe ou autre */}
    </section>
  );
}
