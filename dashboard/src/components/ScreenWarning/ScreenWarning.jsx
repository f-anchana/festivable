'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ScreenWarning.module.scss';

export default function ScreenWarning() {
  const [isTooSmall, setIsTooSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsTooSmall(window.innerWidth < 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  if (!isTooSmall) return null;

  return (
    <div className={styles.overlay}>
      {/* Triangle haut-droite */}
      <Image
        src="/decor/homepage-deco.png"
        alt=""
        width={120}
        height={120}
        className={styles.triangleTop}
        priority
      />

      <div className={styles.message}>
        <h1>
          <span>POUR CRÉER VOTRE</span>
          <span>FESTIVAL RENDEZ-VOUS</span>
          <span>SUR DESKTOP</span>
        </h1>
        <p>
          Ce site est optimisé pour une utilisation sur ordinateur.<br />
          Pour créer votre festival, rendez-vous sur un écran plus large
        </p>
        <Link href="/" className={styles.button}>
          Retourner à l’accueil
        </Link>
      </div>

      {/* Triangle bas-gauche */}
      <Image
        src="/decor/homepage-deco.png"
        alt=""
        width={120}
        height={120}
        className={styles.triangleBottom}
        priority
      />
    </div>
  );
}
