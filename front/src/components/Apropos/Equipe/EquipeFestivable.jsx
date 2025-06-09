'use client';

import styles from './EquipeFestivable.module.scss';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { name: 'Vincent GILBERT', img: '/equipe/vincent.svg' },
  { name: 'Anchana FATIMARAJAN', img: '/equipe/anchana.svg' },
  { name: 'Belkacem MAHRI', img: '/equipe/belka.svg' },
  { name: 'Hugo LECERF', img: '/equipe/hugo.svg' },
  { name: 'Alina Zhyla', img: '/equipe/alina.svg' },
  { name: 'Kelis OSHOFFA', img: '/equipe/kelis.svg' },
  { name: 'Loana CHALACH', img: '/equipe/loana.svg' },
  { name: 'Bastien JACOB', img: '/equipe/bastien.svg' }
];

export default function EquipeFestivAble() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 100, rotate: -5, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 1.5,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
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
      />

      <div className={styles.grid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.card}>
            <img src={member.img} alt={member.name} className={styles.avatar} />
            <div className={styles.name}>{member.name}</div>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <h2>Notre équipe</h2>
        <p>
          Le projet Festiv’Able est porté par une équipe d’étudiant·es aux profils complémentaires
          (communication, développement web, design, gestion de projet…). Né dans le cadre de notre formation,
          ce projet dépasse le simple exercice académique : il s’inscrit dans une démarche de création de valeur concrète,
          avec l’ambition de contribuer activement à une culture plus inclusive.
        </p>
        <p>
          Nous avons travaillé main dans la main pour allier sens, utilité et expérience utilisateur,
          en collaborant avec des acteurs du secteur et des utilisateurs concernés.
        </p>
        <div className={styles.illustration}>
          <Image src="/decor/equipefestivable.svg" alt="" width={600} height={600} />
        </div>
      </div>

      <div className={styles.footerBanner} ref={footerRef}>
        <p>
          <strong>Festiv’Able</strong>, c’est un pas de plus vers des festivals ouverts, partagés, et pensés{' '}
          <span className={styles.highlight}>pour tous</span>.
        </p>
      </div>
    </div>
  );
}
