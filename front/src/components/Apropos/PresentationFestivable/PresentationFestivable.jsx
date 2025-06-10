'use client';

import React, { useEffect, useRef } from "react";
import styles from "./PresentationFestivable.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PresentationFestivable() {
  const aproposRef = useRef(null);
  const collabRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    // Animation section À PROPOS
    gsap.fromTo(
      aproposRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aproposRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animation section Collaboration
    gsap.fromTo(
      collabRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: collabRef.current,
          start: "top 80%",
          toggleActions: "restart none none none",
        },
      }
    );

    // Animation du badge circulaire
    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, scale: 0.5, rotate: -15 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: badgeRef.current,
          start: "top 85%",
          toggleActions: "restart none none none",
        },
      }
    );
  }, []);

  return (
    <main className={styles.presentationContainer}>
      {/* À propos */}
      <section className={styles.aproposSection} ref={aproposRef}>
        <div className={styles.aproposText}>
          <h1 className={styles.aproposTitle}>À PROPOS DE FESTIV’ABLE</h1>
          <h2 className={styles.subtitle}>Qui sommes-nous ?</h2>
          <p>
            Festiv’Able est une initiative née de la volonté de rendre les festivals accessibles à toutes et à tous, sans exception.
            Nous croyons qu’un événement culturel ne doit exclure personne : que vous soyez une personne en situation de handicap,
            parent avec une poussette, personne âgée, blessée temporairement, ou simplement en quête de confort,
            vous avez le droit de vivre l’expérience du festival pleinement.
          </p>
          <p>
            C’est avec cette vision inclusive que notre équipe d’étudiant·e·s a conçu Festiv’Able :
            une plateforme pensée pour accompagner les organisateurs dans la mise en place d’événements réellement accessibles,
            tout en informant les festivaliers des dispositifs prévus sur chaque site.
          </p>
        </div>
        <img
          src="/decor/apropos-1.svg"
          alt=""
          className={styles.aproposIllustration}
        />
      </section>

      {/* Collaboration */}
      <section className={styles.collabSection} ref={collabRef}>
        <img
          src="/decor/apropos-2.svg"
          alt=""
          className={styles.collabImage}
        />
        <div className={styles.collabText}>
          <h2 className={styles.subtitle}>Une collaboration engagée</h2>
          <p>
            Nous sommes fiers d’avoir démarré ce projet en partenariat avec APF France handicap,
            une association de référence dans le domaine du handicap en France.
            Leur soutien et leurs conseils nous ont permis de mieux comprendre les enjeux concrets du terrain
            et d’imaginer des outils utiles, simples et efficaces pour tous.
          </p>
          <button className={styles.collabButton}>Découvrir APF France handicap</button>
        </div>

        <div className={styles.circleContainer} ref={badgeRef}>
          <div className={styles.rotatingText}>
            <Image src="/decor/apfbadge-text.svg" alt="" width={160} height={160} />
          </div>
          <div className={styles.centerImage}>
            <Image src="/decor/apfbadge-center.png" alt="" width={50} height={50} />
          </div>
        </div>
      </section>
    </main>
  );
}
