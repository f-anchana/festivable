'use client';
import styles from './FestivalSection.module.css';
import FestivalCard from '../FestivalCard/FestivalCard';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useState, useRef, useEffect } from 'react';
import { FestivalSectionAnimation } from './FestivalSectionAnimation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

gsap.registerPlugin(ScrollTrigger);

export default function FestivalsSection() {
  const [festivals, setFestivals] = useState([]);
  const sectionRef = useRef(null);
  const textRecruitRef = useRef(null);
  const imageRecruitRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    FestivalSectionAnimation(sectionRef);

    // Animations avec GSAP
    gsap.fromTo(
      `.${styles.titleWrapper}`,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.titleWrapper}`,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      `.${styles.cardsWrapper} > *`,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: `.${styles.cardsWrapper}`,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      `.${styles.viewAll}`,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.viewAll}`,
          start: 'top 90%',
        },
      }
    );

    gsap.fromTo(
      `.${styles.accessibilitySection} .${styles.container}`,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.accessibilitySection}`,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      `.${styles.sectionAction} .${styles.title1}`,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.sectionAction} .${styles.title1}`,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      `.${styles.cardContainer} > .${styles.card}`,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.${styles.cardContainer}`,
          start: 'top 80%',
        },
      }
    );

    // Recrutement : texte et image
    gsap.fromTo(
      textRecruitRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRecruitRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'restart none none none',
        },
      }
    );

    gsap.fromTo(
      imageRecruitRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRecruitRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'restart none none none',
        },
      }
    );

  async function fetchFestivals() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/festivals`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();

      const festivalsWithCovers = await Promise.all(
        data.map(async (festival) => {
          try {
            const galleryRes = await fetch(`${API_URL}/gallery/${festival._id}`);

            if (galleryRes.status === 404) {
              // Pas de galerie pour ce festival
              return { ...festival, image: null };
            }

            if (!galleryRes.ok) throw new Error('Erreur galerie');

            const galleryData = await galleryRes.json();
            const firstImagePath = galleryData.images?.[0];

            return {
              ...festival,
              image: firstImagePath
                ? `${API_URL}/${firstImagePath.replace(/\\/g, '/')}`
                : null,
            };
          } catch (err) {
            console.error(`Erreur pour la galerie du festival ${festival._id}:`, err);
            return { ...festival, image: null };
          }
        })
      );

      setFestivals(festivalsWithCovers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchFestivals();
}, []);


  return (
    <section id="festival-section" className={styles.festivalsSection} ref={sectionRef}>
      <div className={styles.festivalIntro}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>LES FESTIVALS CERTIFIÉS</h2>
          <p className={styles.subtitle}>
            Parce que chacun mérite de vivre l'expérience unique d'un festival, <br />
            explorez les événements conçus pour être accueillants et adaptés à tous.
          </p>
        </div>

              <div className={styles.button} >
        <a href="/AllFestivals">Voir tous nos festivals</a>
        <Image
          src="/icones/menu-roll.svg"
          alt=""
          width={12}
          height={12}
          style={{ transform: 'rotate(-90deg)', marginLeft: '8px' }}
        />
      </div>



        <div className={styles.cardsWrapper}>
          {loading && <p>Chargement des festivals en cours...</p>}
          {error && <p style={{ color: '#8B0000' }}>Erreur : {error}</p>}
          {!loading && !error && festivals.length === 0 && <p>Aucun festival trouvé.</p>}
{!loading &&
  !error &&
  festivals
    .filter((festival) => festival.valid === true) // ne garde que les festivals validés
    .slice(0, 4) 
    .map((festival) => (
      <FestivalCard
        key={festival._id}
        _id={festival._id} 
        title={festival.title}
        description={festival.description}
        startDate={festival.start_date}
        endDate={festival.end_date}
        address={festival.address}
        link={festival.link}
        prices={festival.prices}
        imageSrc={festival.image}
        pictoaccess={festival.pictoaccess}
      />
    ))}

        </div>
      </div>

      <div className={styles.accessibilitySection}>
        <div className={styles.container}>
          <div className={styles.imageWrapper} >
            <Image
              src="/images/engagement-info-photo.svg"
              alt=" "
              className={styles.image}
              width={400} 
              height={300}
              priority
            />
          </div>
          <div className={styles.textContent}>
            <Image
              src="/decor/homepage-deco.png"
              alt=""
              className={styles.decor}
              width={100}
              height={100}
              priority
            />
            <h2 className={styles.heading}>
              <span>NOTRE ENGAGEMENT</span>
              <br />
              <span>POUR UNE ACCESSIBILITÉ TOTALE</span>
            </h2>
            <p className={styles.paragraph}>
              Chez Festiv'able, nous avons une mission : rendre chaque festival accessible à tous,
              sans exception !
              <br />
              <br />
              C'est pourquoi nous sommes fiers de collaborer avec <strong>PictoAccess</strong>, la
              référence en matière d'évaluation et de mise en place de solutions d'accessibilité.
              <br />
              <br />
              Ensemble, nous œuvrons pour que chaque événement soit une expérience inclusive et
              inoubliable !
            </p>
<a href="/Apropos" className={styles.button}> En savoir plus</a>
          </div>
          <div className={styles.triangle}></div>
        </div>
      </div>

      <div className={styles.sectionAction}>
        <Image
          src="/decor/homepage-deco1.png"
          alt=""
          width={200}
          height={200}
          className={styles.decor4}
          priority
        />
        <Image
          src="/decor/cercle-decor.svg"
          alt=""
          width={200}
          height={200}
          className={styles.decor5}
          priority
        />

        <h2 className={styles.title1}>Des actions concrètes pour une expérience inclusive</h2>

        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${styles.blue}`}>
            <div className={styles.label}>Accès et mobilité</div>
            <p className={styles.text}>
              Rampes d’accès, chemins stabilisés, places de parking réservées et navettes adaptées.
            </p>
          </div>

          <div className={`${styles.card} ${styles.orange}`}>
            <div className={styles.label}>Accompagnement</div>
            <div className={styles.label}>et assistance sensorielle</div>
            <p className={styles.text}>
              Bénévoles formés à l’accueil des personnes en situation de handicap, aides humaines
              pour l’orientation et l’accompagnement.
            </p>
          </div>

          <div className={`${styles.card} ${styles.yellow}`}>
            <div className={styles.label}>Billeterie</div><br />
            <div className={styles.label}>et services adaptés</div>
            <p className={styles.text}>
              Tarification spécifique, réservations prioritaires et informations claires sur les
              dispositifs disponibles.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.recruitSection}>
        <div className={styles.recruitContent}>
        <div className={styles.recruitText} ref={textRecruitRef}>
            <h2 className={styles.recruitTitle}>
              <span>FACILITEZ LE RECRUTEMENT</span>
              <br />
              <span>POUR VOTRE FESTIVAL</span>
            </h2>

            <div className={`${styles.recruitImageWrapper} ${styles.mobileOnly} `} >
              <Image
                src="/images/recruitment.svg"
                alt=""
                width={600}
                height={600}
                priority
              />
            </div>

            <p>
              Avec Festiv'able, les organisateurs ont la possibilité d’inclure directement leurs
              besoins en recrutement lors de l’inscription de leur événement.
            </p>
            <p>
              En cochant simplement l’option dédiée dans notre formulaire, vous pouvez préciser
              les postes à pourvoir (bénévoles, techniciens, accompagnateurs, etc.) ainsi que les
              conditions éventuelles (rémunération, missions). Ces informations seront mises en
              avant pour faciliter la mise en relation avec les personnes intéressées.
            </p>
          </div>

          <div className={`${styles.recruitImageWrapper} ${styles.desktopOnly}`}ref={imageRecruitRef}  >
            <Image
              src="/images/recrutement.svg"
              alt=""
              width={500}
              height={600}
              priority
            />
          </div>
        </div>
      </div>


      
<div className={styles.sectionPartenaire}>
  <div className={styles.partenaireContent}>
    <h2 className={styles.title}>NOS PARTENAIRES</h2>
    <p>
      Chez Festiv'able, nous sommes fiers de collaborer avec des acteurs majeurs engagés dans
      l’accessibilité et la culture.
      <br />
      Le Ministère de la Culture et l’association APF France handicap nous font confiance
      pour porter une vision commune : rendre les festivals véritablement accessibles à toutes
      et tous.
    </p>

    <div className={styles.partenaireImagesWrapper}>
      <div className={styles.partenaireImagesTrack}>
        <div className={styles.partenaireImages}>
          <div className={styles.partenaireImage}>
            <Image src="/images/ministere.svg" alt="Ministère" width={200} height={200} priority />
          </div>
          <div className={styles.partenaireImage}>
            <Image src="/images/printempsBourges.svg" alt="Printemps de Bourges" width={200} height={200} priority />
          </div>
          <div className={styles.partenaireImage}>
            <Image src="/images/APF.svg" alt="APF" width={200} height={200} priority />
          </div>
          <div className={styles.partenaireImage}>
            <Image src="/images/rockEnSeine.svg" alt="Rock en Seine" width={200} height={200} priority />
          </div>
          <div className={styles.partenaireImage}>
            <Image src="/images/pictoaccess.jpg" alt="Picto Access" width={200} height={200} priority />
          </div>

          {/* duplication pour boucle fluide */}
          <div className={styles.partenaireImage}>
            <Image src="/images/ministere.svg" alt="Ministère" width={200} height={200} priority />
          </div>
          <div className={styles.partenaireImage}>
            <Image src="/images/printempsBourges.svg" alt="Printemps de Bourges" width={200} height={200} priority />
          </div>
          <div className={styles.partenaireImage}>
            <Image src="/images/APF.svg" alt="APF" width={200} height={200} priority />
          </div>
          <div className={styles.partenaireImage}>
            <Image src="/images/rockEnSeine.svg" alt="Rock en Seine" width={200} height={200} priority />
          </div>
          <div className={styles.partenaireImage}>
            <Image src="/images/pictoaccess.jpg" alt="Picto Access" width={200} height={200} priority />
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

    </section>
  );
}
