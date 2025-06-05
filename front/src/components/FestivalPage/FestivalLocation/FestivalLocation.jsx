'use client';

import s from './FestivalLocation.module.scss';

export default function FestivalLocation({ id }) {
  const embedUrl = `${process.env.NEXT_PUBLIC_API_URL}/embed-map/${id}`;
  console.log("Embed URL:", embedUrl);


  return (
    <section className={s.location}>
      <div className={s.location__title}>LOCALISATION</div>

      <div className={s.location__map}>
        <iframe
          title="Carte interactive du festival"
          src={embedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}