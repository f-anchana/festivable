'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './FestivalAccessibility.module.scss';

const allPictograms = [
  {
    title: 'Accès PMR',
    pictogram: '/pictograms/active/Wheelchair.png',
    conditions: ['pmrParking', 'wheelchairRamp', 'flooringAndAccess', 'wheelchairLoan'],
  },
  {
    title: 'Navettes accessibles',
    pictogram: '/pictograms/active/navette.svg',
    conditions: ['accessibleShuttle'],
  },
  {
    title: 'Poussettes',
    pictogram: '/pictograms/active/Poussettes.svg',
    conditions: ['wheelchairRamp', 'flooringAndAccess'],
  },
  {
    title: 'Malvoyants / Aveugles',
    pictogram: '/pictograms/active/Blind.png',
    conditions: ['audioGuides', 'tactileMarkers'],
  },
  {
    title: 'Balises sonores / Audio',
    pictogram: '/pictograms/active/Audio.svg',
    conditions: ['audioGuides'],
  },
  {
    title: 'Handicap auditif / LSR',
    pictogram: '/pictograms/active/LSR.png',
    conditions: ['signLanguageInterpreters', 'safetyBarriers'],
  },
  {
    title: 'Malentendants',
    pictogram: '/pictograms/active/Deaf.svg',
    conditions: ['signLanguageInterpreters'],
  },
  {
    title: 'Chien guide',
    pictogram: '/pictograms/active/Dog.svg',
    conditions: ['guideDogsAllowed'],
  },
  {
    title: 'Accompagnement',
    pictogram: '/pictograms/active/accompagnateur.png',
    conditions: ['supportDevices'],
  },
  {
    title: 'Accompagnateur',
    pictogram: '/pictograms/active/help.png',
    conditions: ['supportDevices'],
  },
  {
    title: 'Texte simplifié - FALC',
    pictogram: '/pictograms/active/falc.png',
    conditions: ['supportDevices'],
  },
  {
    title: 'Zone de repos',
    pictogram: '/pictograms/active/zone.svg',
    conditions: ['calmSpaces'],
  },
  {
    title: 'Enfant en bas âge',
    pictogram: '/pictograms/active/kid.png',
    conditions: ['calmSpaces'],
  },
  {
    title: 'Zones assises',
    pictogram: '/pictograms/active/sit.svg',
    conditions: ['calmSpaces'],
  },
  {
    title: 'Zone bruyante',
    pictogram: '/pictograms/active/noisy.png',
    conditions: ['sensitiveAreasSigns'],
  },
];

export default function FestivalAccessibility() {
  const { id } = useParams();
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    const fetchAccessibility = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/answer/${id}`);
        const data = await res.json();
        setAnswers(data.answers || {});
      } catch (error) {
        console.error('Erreur récupération accessibilité :', error);
      }
    };

    if (id) fetchAccessibility();
  }, [id]);

  const isPictogramActive = (conditions) => {
    return conditions.some((cond) => answers?.[cond]);
  };

  if (!answers) {
    return <p className={styles.loading}>Chargement de l’accessibilité...</p>;
  }

  return (
    <section className={styles.accessibility} aria-labelledby="access-title">
      <h2 id="access-title" className={styles.title}>
        Accessibilité du festival :
      </h2>

      <div className={styles.grid} role="list">
        {allPictograms
          .filter((picto) => isPictogramActive(picto.conditions))
          .map((picto, i) => (
            <div
              key={i}
              className={styles.card}
              role="listitem"
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={picto.pictogram}
                  alt={picto.title}
                  width={50}
                  height={50}
                />
              </div>
              <span>{picto.title}</span>
            </div>
          ))}
      </div>
    </section>
  );
}
