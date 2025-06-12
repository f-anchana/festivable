'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import s from "./FestivalDescription.module.scss";




export default function FestivalDescription({ festival }) {
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
      </div>
    </section>
  );
}