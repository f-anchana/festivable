'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import s from "./FestivalHeader.module.scss";

export default function FestivalHeader({ id }) {
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/festival/${id}`)
      .then(res => res.json())
      .then(data => setFestival(data))
      .catch(err => console.error("Erreur lors du fetch:", err));
  }, [id]);

  if (!festival) return <p>Chargement...</p>;

  return (
    <section className={`${s.festival} festival-header`} aria-labelledby="festival-title">
      <div className={`${s.festival__container} festival-header__container`}>
        <h1 id="festival-title" className={s.festival__title}>{festival.title}</h1>
        <h2 className={s.festival__subtitle}>Présenté par <span>Nom de l'organisateur</span></h2>
        <div className={s.festival__info}>
          <div className={s.festival__infoItem}>
            <Image src="/icones/calendar.svg" alt="Calendrier" width={20} height={30} />
            <p>Date : {new Date(festival.start_date).toLocaleDateString()} – {new Date(festival.end_date).toLocaleDateString()}</p>
          </div>

          <div className={s.festival__infoItem}>
            <Image src="/icones/house.svg" alt="Lieu" width={20} height={30} />
            <p>Lieu : {festival.address}</p>
          </div>

          <div className={s.festival__infoItem}>
            <Image src="/icones/info.svg" alt="Accessibilité" width={20} height={30} />
            <div className={s.festival__infoBadges}>
              {festival.accessibility?.wheelchair_accessible && <span className={s.festival__infoBadge}>Accessible en fauteuil</span>}
              {festival.accessibility?.disabled_parking_available && <span className={s.festival__infoBadge}>Parking PMR</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
