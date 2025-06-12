'use client';

import { useEffect, useState } from 'react';
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
      <div className={styles.message}>
        <h1>
          <span>POUR CRÉER VOTRE</span>
          <span>FESTIVAL RENDEZ-VOUS</span>
          <span>SUR DESKTOP</span>
        </h1>
        <p>
          Ce site est optimisé pour une utilisation sur ordinateur.<br />
          Pour créer votre festival, rendez-vous sur un écran plus large.
        </p>
      </div>
    </div>
  );
}
