import React from 'react';
import styles from './FestivalSection.module.css';
import FestivalCard from '../FestivalCard/FestivalCard';
import Image from 'next/image';
          
const Festivals = [
  {
    id: 1,
    title: 'Zeyzey Presents: Sister Sledge',
    organisation: 'ZeyZey Miami',
    date: '28 juin 2025 - 21:00',
    price: '42€ ',
    image: '/images/festival-1.svg',
  },
  {
    id: 2,
    title: 'Rock en Seine Access',
    organisation: 'ZeyZey Miami',
    date: '15 juillet 2025 - 19:30',
    price: '35€ ',
    image: '/images/festival-2.svg',
  },
  {
    id: 3,
    title: 'Jazz libre Festival',
    organisation: 'ZeyZey Miami',
    date: '1 août 2025 - 20:00',
    price: '29€ ',
    image: '/images/festival-3.svg',
  },

  {
    id: 4,
    title: 'Jazz libre Festival',
    organisation: 'ZeyZey Miami',
    date: '1 août 2025 - 20:00',
    price: '29€ ',
    image: '/images/festival-4.svg',
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



    <div className={styles.accessibilitySection}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img  src="/images/engagement-info-photo.svg"  alt="Jeune fille en fauteuil"  className={styles.image} /> 
        </div>
        <div className={styles.textContent}>
           <Image
        src="/decor/homepage-deco.png"
        alt=""
        className={styles.decor}
        width={100}
        height={100}
      />
          <h2 className={styles.heading}>
            <span>NOTRE ENGAGEMENT</span><br />
            <span>POUR UNE ACCESSIBILITÉ TOTALE</span>
          </h2>
          <p className={styles.paragraph}>
            Chez Festivable, nous avons une mission : rendre chaque festival accessible à tous, sans exception !<br /><br />
            C'est pourquoi nous sommes fiers de collaborer avec <strong>PictoAccess</strong>, la référence en matière d'évaluation et de mise en place de solutions d'accessibilité.<br /><br />
            Ensemble, nous œuvrons pour que chaque événement soit une expérience inclusive et inoubliable !
          </p>
          <button className={styles.button}>
            En savoir plus <span>↗</span>
          </button>
        </div>
        <div className={styles.triangle}></div>
      </div>
      </div>



      

    </section>


  );
}


