'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import s from "./FestivalHeader.module.scss";

export default function FestivalHeader({ festival }) {
  if (!festival) return <p>Chargement...</p>;

  return (
    <section className={`${s.festival} festival-header`} aria-labelledby="festival-title">
      <div className={`${s.festival__container} festival-header__container`}>
        <h1 id="festival-title" className={s.festival__title}>{festival.title}</h1>
        <h2 className={s.festival__subtitle}>Présenté par <span>Nom de l'organisateur</span></h2>
        <div className={s.festival__info}>
          <div className={s.festival__infoItem}>
            <Image src="/icones/calendar.svg" alt="Calendrier" width={20} height={30} />
<p>
  Date : {new Date(festival.start_date).toISOString().slice(0, 10)} – {new Date(festival.end_date).toISOString().slice(0, 10)}
</p>          </div>

          <div className={s.festival__infoItem}>
            <Image src="/icones/house.svg" alt="Lieu" width={20} height={30} />
            <p>Lieu : {festival.address}</p>
          </div>

  <div className={s.festival__infoItem}>
  <Image src="/icones/info.svg" alt="Accessibilité" width={20} height={30} />
  <p>
  {festival.pictoaccess ? 'Certifié PictoAccess' : 'Non certifié PictoAccess'}
</p>

          </div>
        </div>
      </div>
    </section>
  );
}