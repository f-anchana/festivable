'use client';

import s from './FestivalLocation.module.scss';
import Image from 'next/image';

export default function FestivalLocation() {
  return (
    <section className={s.location}>
      <div className={s.location__title}>LOCALISATION</div>
      <div className={s.location__info}>
        <Image
          src="/icones/pin.svg"
          alt="Icône de localisation"
          width={20}
          height={20}
          aria-hidden="true"
        />
        <p>Forêt Enchantée, Montagne Verte, France</p>
      </div>
      <div className={s.location__map}>
        <iframe
          title="Carte du festival"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9993574817294!2d2.3333333!3d48.8700000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2968c4a0b7%3A0xe4515bdb3b26a2e7!2sParis!5e0!3m2!1sfr!2sfr!4v1680000000000!5m2!1sfr!2sfr"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
