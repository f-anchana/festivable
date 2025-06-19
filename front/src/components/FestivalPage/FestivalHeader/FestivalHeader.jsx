"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./FestivalHeader.module.scss";

export default function FestivalHeader({ festival }) {
  if (!festival) return <p>Chargement...</p>;

  return (
    <section
      className={`${s.festival} festival-header`}
      aria-labelledby="festival-title"
    >
      <div className={s.festival__container}>
        <h1 id="festival-title" className={s.festival__title}>
          {festival.title}
        </h1>

        <h2 className={s.festival__subtitle}>
          Présenté par{" "}
          <span>
            {festival.organizer?.organization_name || "Organisateur inconnu"}
          </span>
        </h2>

        <div className={s.festival__info}>
          <div className={s.festival__infoItem}>
            <Image
              src="/icones/calendar.svg"
              alt="Calendrier"
              width={20}
              height={30}
            />
            <p>
              Date : {new Date(festival.start_date).toISOString().slice(0, 10)}{" "}
              – {new Date(festival.end_date).toISOString().slice(0, 10)}
            </p>
          </div>

          <div className={s.festival__infoItem}>
            <Image src="/icones/house.svg" alt="Lieu" width={20} height={30} />
            <p>Lieu : {festival.address}</p>
          </div>

          {festival.pictoaccess && (
            <div className={`${s.festival__infoItem} ${s.pictoaccess}`}>
              <Image
                src="/icones/info.svg"
                alt="Accessibilité"
                width={20}
                height={30}
              />
              <p>Certifié PictoAccess</p>
            </div>
          )}
        </div>

        {festival.link && (
          <a
            href={festival.link}
            target="_blank"
            rel="noopener noreferrer"
            className={s.festival__cta}
          >
            Site officiel 🡥
          </a>
        )}
      </div>
    </section>
  );
}
