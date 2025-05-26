'use client';
import styles from './FestivalSection.module.css';
import FestivalCard from '../FestivalCard/FestivalCard';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import {FestivalSectionAnimation} from '@/components/FestivalSection/FestivalSectionAnimation';

gsap.registerPlugin(ScrollTrigger);

const Festivals = [
  {
    id: 1,
    title: 'Zeyzey Presents: Sister Sledge',
    organisation: 'ZeyZey Miami',
    date: '28 juin 2025 - 21:00',
    price: '42€',
    image: '/images/festival-1.svg',
  },
  {
    id: 2,
    title: 'Rock en Seine Access',
    organisation: 'ZeyZey Miami',
    date: '15 juillet 2025 - 19:30',
    price: '35€',
    image: '/images/festival-2.svg',
  },
  {
    id: 3,
    title: 'Jazz libre Festival',
    organisation: 'ZeyZey Miami',
    date: '1 août 2025 - 20:00',
    price: '29€',
    image: '/images/festival-3.svg',
  },
  {
    id: 4,
    title: 'Jazz libre Festival',
    organisation: 'ZeyZey Miami',
    date: '1 août 2025 - 20:00',
    price: '29€',
    image: '/images/festival-4.svg',
  },
];

export default function FestivalsSection() {
  const sectionRef = useRef(null);

  FestivalSectionAnimation(sectionRef);

  return (
    
    <section id="festival-section" className={styles.festivalsSection}  ref={sectionRef}>
    <div className={styles.festivalIntro}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>LES FESTIVALS CERTIFIÉS</h2>
        <p className={styles.subtitle}>
          Parce que chacun mérite de vivre l'expérience unique d'un festival, <br/>
          explorez les événements conçus pour être accueillants et adaptés à tous.
        </p>
      </div>

      <div className={styles.cardsWrapper}>
        {Festivals.map((festival) => (
          <FestivalCard key={festival.id} {...festival} />
        ))}
      </div>

    </div>

      <div className={styles.viewAll}>
        <a href="#">Voir tous nos festivals</a>
        <Image
          src="/icones/menu-roll.svg"
          alt=""
          width={12}
          height={12} 
          style={{ transform: 'rotate(-90deg)', marginLeft: '8px' }} 
        />
      </div>

      <div className={styles.accessibilitySection}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <img 
              src="/images/engagement-info-photo.svg" 
              alt="Jeune fille en fauteuil" 
              className={styles.image} 
            /> 
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
              En savoir plus  🡥
            </button>
          </div>
          <div className={styles.triangle}></div>
        </div>
      </div>

      <div className={styles.sectionAction}>
          <Image src="/decor/homepage-deco1.png" alt="" width={200} height={200} className={styles.decor4}/>
          <Image src="/decor/cercle-decor.svg" alt="" width={200} height={200} className={styles.decor5}/>


        
        <h2 className={styles.title1}>
          Des actions concrètes pour une expérience inclusive
        </h2>

        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${styles.blue}`}>
            <div className={styles.label}>ACCÈS ET MOBILITÉ</div>
            <p className={styles.text}>
              Rampes d’accès, chemins stabilisés, places de parking réservées et
              navettes adaptées.
            </p>
          </div>

          <div className={`${styles.card} ${styles.orange}`}>
            <div className={styles.label}>ACCOMPAGNEMENT</div>
            <div className={styles.label}>ET ASSISTANCE SENSORIELLE</div>
            <p className={styles.text}>
              Bénévoles formés à l’accueil des personnes en situation de handicap,
              aides humaines pour l’orientation et l’accompagnement.
            </p>
          </div>

          <div className={`${styles.card} ${styles.yellow}`}>
            <div className={styles.label}>BILLETTERIE</div>
            <div className={styles.label}>ET SERVICES ADAPTÉS</div>
            <p className={styles.text}>
              Tarification spécifique, réservations prioritaires et informations
              claires sur les dispositifs disponibles.
            </p>
          </div>
        </div>
      </div>

   <div className={styles.recruitSection}>
  <div className={styles.recruitContent}>
    <div className={styles.recruitText}>
      <h2 className={styles.recruitTitle}>
        <span>FACILITEZ LE RECRUTEMENT</span><br />
        <span>POUR VOTRE FESTIVAL</span>
      </h2>

      {/* IMAGE version mobile */}
      <div className={`${styles.recruitImageWrapper} ${styles.mobileOnly}`}>
        <Image
          src="/images/recruitment.svg"
          alt="Jeunes bénévoles assis"
          width={600}
          height={600}
        />
      </div>

      <p>Avec Festivable, les organisateurs ont la possibilité d’inclure directement leurs besoins en recrutement lors de l’inscription de leur événement.</p>
      <p> En cochant simplement l’option dédiée dans notre formulaire, vous pouvez préciser les postes à pourvoir (bénévoles, techniciens, accompagnateurs, etc.) ainsi que les conditions éventuelles (rémunération, missions). Ces informations seront mises en avant pour faciliter la mise en relation avec les personnes intéressées.</p>
      <button className={styles.button}>S'inscrire 🡥</button>
    </div>

    {/* IMAGE version desktop */}
    <div className={`${styles.recruitImageWrapper} ${styles.desktopOnly}`}>
      <Image
        src="/images/recruitment.svg"
        alt="Jeunes bénévoles assis"
        width={600}
        height={600}
      />
    </div>
  </div>
</div>

<div className={styles.sectionPartenaire}>
  <div className={styles.partenaireContent}>
    <h2 className={styles.title}>NOS PARTENAIRES</h2>
    <p>
      Chez Festivable, nous sommes fiers de collaborer avec des acteurs majeurs engagés dans l’accessibilité et la culture.<br/>
      Le Ministère de la Culture et l’association APF France handicap nous font confiance pour porter une vision commune : rendre les festivals véritablement accessibles à toutes et tous.
    </p>
    <div className={styles.partenaireImages}>
      <div className={styles.partenaireImage}>
        <Image src="/images/ministere.svg" alt="Ministère" width={200} height={200}   />
      </div>
      <div className={styles.partenaireImage}>
        <Image src="/images/printempsBourges.svg" alt="Printemps de Bourges" width={200} height={200} />
      </div>
      <div className={styles.partenaireImage}>
        <Image src="/images/APF.svg" alt="APF" width={200} height={200} />
      </div>
      <div className={styles.partenaireImage}>
        <Image src="/images/rockEnSeine.svg" alt="Rock en Seine" width={200} height={200} />
      </div>
    </div>
  </div>
</div>

    </section>
  );
}
