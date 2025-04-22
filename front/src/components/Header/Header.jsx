'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css'; // Import du fichier CSS

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link href="/" className={styles.logo}>
          <Image src="/logo/Logo_Festivable.svg" alt="Accueil" width={120} height={60} />
        </Link>

        {/* MENU BURGER */}
        <button className={styles.burgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Image src="/icones/burger-menu.svg" alt="Menu" width={30} height={30} />
        </button>

        {/* MENU DESKTOP */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="#">Accessibilité</Link>
            <Image src="/icones/menu-roll.svg" alt="" width={12} height={12} />
          </li>
          <li><Link href="#">Festivals</Link></li>
          <li>
            <Link href="#">À propos</Link>
            <Image src="/icones/menu-roll.svg" alt="" width={12} height={12} />
          </li>
          <li><Link href="#">Forum</Link></li>
        </ul>

        {/* BOUTONS AUTH (Desktop) */}
        <div className={styles.authButtons}>
          <Link href="/form" className={styles.btnBlack}>Se connecter</Link>
          <Link href="/login" className={styles.btnWhite}>S'inscrire</Link>
        </div>
      </div>

      {/* MENU MOBILE */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
        {/* Bouton de fermeture */}
        <button className={styles.closeButton} onClick={() => setIsMenuOpen(false)}>
          <Image src="/icones/close-btn-menu.svg" alt="Fermer" width={24} height={24} />
        </button>

        <ul>
          <li><Link href="#">Accessibilité</Link></li>
          <li><Link href="#">Festivals</Link></li>
          <li><Link href="#">À propos</Link></li>
          <li><Link href="#">Forum</Link></li>
        </ul>

        {/* BOUTONS AUTH (Mobile) */}
        <div className={styles.mobileAuthButtons}>
          <Link href="/form" className={styles.btnBlack}>Se connecter</Link>
          <Link href="/login" className={styles.btnWhite}>S'inscrire</Link>
        </div>
      </div>
    </nav>
  );
}
