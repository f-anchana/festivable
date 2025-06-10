'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import s from "./FestivalDescription.module.scss";

export default function FestivalDescription({ id }) {
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
    <section
      className="festival-description"
      aria-labelledby="festival-description-title"
    >
      <div className={`${s.festivaldescription__container} festival-description__container`}>
        <div className={`${s.festivaldescription__header} festival-description__header`}>
          <h1 id="festival-description-title" className={`${s.festivaldescription__title} festival-description__title`}>
            Description
          </h1>
          <p className={`${s.festivaldescription__text} festival-description__text`}>
            {festival.description}
          </p>
        </div>

        <div className={`${s.festivaldescription__content} festival-description__content`}>
          <h2>À propos du festival :</h2>

          <div className={`${s.festivaldescription__item}`}>
            <Image src="/icones/calendar.svg" alt="Calendrier" width={30} height={50} aria-hidden="true" />
            <div className={`${s.festivaldescription__itemtext}`}>
              <h3>Dates</h3>
              <p>{new Date(festival.start_date).toLocaleDateString()} - {new Date(festival.end_date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className={`${s.festivaldescription__item}`}>
            <Image src="/icones/pin.svg" alt="pin" width={30} height={50} aria-hidden="true" />
            <div className={`${s.festivaldescription__itemtext}`}>
              <h3>Lieu</h3>
              <p>{festival.address}</p>
            </div>
          </div>

          <div className={`${s.festivaldescription__item}`}>
            <Image src="/icones/clock.svg" alt="Horloge" width={30} height={50} aria-hidden="true" />
            <div className={`${s.festivaldescription__itemtext}`}>
              <h3>Durée</h3>
              <p>Ouvert de 12h à 01h30 durant toute la période des festivités.</p>
            </div>
          </div>

          <div className={`${s.festivaldescription__item}`}>
            <Image src="/icones/language.svg" alt="Langues" width={30} height={50} aria-hidden="true" />
            <div className={`${s.festivaldescription__itemtext}`}>
              <h3>Langues</h3>
              <p>Français, Anglais</p>
            </div>
          </div>

          <div className={`${s.festivaldescription__item}`}>
            <Image src="/icones/info.svg" alt="Accessibilité" width={30} height={50} aria-hidden="true" />
            <div className={`${s.festivaldescription__itemtext}`}>
              <h3>Accessibilité</h3>
              <div className={s.festivaldescription__itemBadges}>
                {festival.accessibility?.wheelchair_accessible && (
                  <span className={s.festivaldescription__itemBadge}>Accessible en fauteuil</span>
                )}
                {festival.accessibility?.disabled_parking_available && (
                  <span className={s.festivaldescription__itemBadge}>Parking PMR</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
