import React from 'react';
import styles from './FestivalSection.module.css';
import FestivalCard from '../FestivalCard/FestivalCard';
import Image from 'next/image';
          
const Festivals = [
  {
    id: 1,
    title: 'Zeyzey Presents: Sister Sledge',
    date: '28 juin 2025 - 21:00',
    price: '42€ ',
    image: '/images/festival-1.svg',
  },
  {
    id: 2,
    title: 'Rock en Seine Access',
    date: '15 juillet 2025 - 19:30',
    price: '35€ ',
    image: '/images/festival-2.svg',
  },
  {
    id: 3,
    title: 'Jazz libre Festival',
    date: '1 août 2025 - 20:00',
    price: '29€ ',
    image: '/images/festival-3.svg',
  },

  {
    id: 4,
    title: 'Jazz libre Festival',
    date: '1 août 2025 - 20:00',
    price: '29€ ',
    image: '/images/festival-3.svg',
  },
];

export default function FestivalsSection() {
  return (
    <section id="festivals" className={styles.festivalsSection}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>LES FESTIVALS CERTIFIÉS</h2>
        <p className={styles.subtitle}>
        Parce que chacun mérite de vivre l'expérience unique d'un festival, <br/>
        explorez les événements conçus pour être accueillants et adaptés à tous.        </p>
      </div>

      <div className={styles.cardsWrapper}>
        {Festivals.map((festival) => (
          <FestivalCard key={festival.id} {...festival} />
        ))}
      </div>

      <div className={styles.viewAll}>
        <a href="#">Voir tous nos festivals</a>
        <Image src="/icones/menu-roll.svg" alt="" width={12} height={12} 
    style={{ transform: 'rotate(-90deg)', marginLeft: '8px' }} 
/>
        
      </div>
    </section>
  );
}


