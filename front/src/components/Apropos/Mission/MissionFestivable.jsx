'use client';

import { useEffect, useRef } from 'react';
import styles from './MissionFestivable.module.scss';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionFestivAble() {
  const titleRef = useRef(null);
  const missionBoxRef = useRef(null);
  const recruitmentRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    // Titre
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Mission Box
    gsap.fromTo(
      missionBoxRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: missionBoxRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Recruitment Section
    gsap.fromTo(
      recruitmentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: recruitmentRef.current,
          start: 'top 85%',
          toggleActions: 'restart none none none',
        },
      }
    );

    // Petite animation de la déco
    gsap.fromTo(
      decorRef.current,
      { opacity: 0, scale: 0.8, rotate: -10 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: decorRef.current,
          start: 'top 90%',
          toggleActions: 'restart none none none',
        },
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <Image
        src="/decor/homepage-deco1.png"
        alt=""
        width={150}
        height={150}
        className={styles.decor3}
        ref={decorRef}
      />

      <Image
        src="/decor/homepage-deco.png"
        alt=""
        width={80}
        height={80}
        className={styles.decor1}
      />

      <h1 className={styles.title} ref={titleRef}>Notre mission</h1>

      <div className={styles.missionBox} ref={missionBoxRef}>
        <p><strong>Notre objectif est double :</strong></p>
        <ul>
          <li><span className={styles.bullet}></span> <strong>Accompagner les organisateurs</strong> à intégrer des aménagements inclusifs dès la conception de leurs festivals (accès PMR, signalétique adaptée, toilettes accessibles, etc.)</li>
          <li><span className={styles.bullet}></span> <strong>Informer les festivaliers</strong> en leur offrant une vision claire et détaillée des dispositifs disponibles avant leur venue</li>
        </ul>
        <br />
        <p className={styles.italic}>
          → Nous voulons créer un pont entre événementiel et accessibilité, pour que l'expérience du festival devienne un droit et non un privilège.
        </p>
      </div>

      <div className={styles.recruitmentSection} ref={recruitmentRef}>
        <div className={styles.imageWrapper}>
          <Image src='/images/missionimage.svg' alt="" className={styles.image} width={600} height={600} />
        </div>
        <div className={styles.textWrapper}>
          <h2>Une gestion simplifiée du recrutement</h2>
          <p>
            Pour faciliter le fonctionnement des festivals, Festiv’Able offre également aux organisateurs la possibilité de centraliser leurs recrutements directement sur la plateforme. Lorsqu’un festival est référencé, les organisateurs peuvent publier et gérer leurs offres d’emploi via un onglet dédié. Cette fonctionnalité simplifie la recherche de profils adaptés, tout en favorisant l’inclusion dans les équipes événementielles. Pour consulter les postes disponibles, rendez-vous sur les pages des festivals concernés, dans la rubrique <strong>« On recrute ! »</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
