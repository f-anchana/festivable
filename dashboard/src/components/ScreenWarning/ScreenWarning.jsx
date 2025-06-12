'use client';

import { useEffect, useState } from 'react';
import styles from './ScreenWarning.module.scss'; // tu peux aussi faire inline

export default function ScreenWarning() {
  const [isTooSmall, setIsTooSmall] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsTooSmall(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (!isTooSmall) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.message}>
        🖥️ Veuillez utiliser un écran de taille supérieure a 1024px pour accéder au dashboard.
      </div>
    </div>
  );
}
