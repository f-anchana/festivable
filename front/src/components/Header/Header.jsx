'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Header.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAccessibilityOpen, setIsMobileAccessibilityOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  const navbarRef = useRef(null);

  useEffect(() => {
    const navbar = navbarRef.current;

    if (!navbar) return;

    ScrollTrigger.create({
      trigger: "#festival-section", // section déclenchante
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        gsap.to(navbar, {
          backgroundColor: "#ffffff",
          duration: 0.4,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(navbar, {
          backgroundColor: "transparent",
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <nav ref={navbarRef} className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo/Logo_Festivable.svg" alt="Accueil" width={120} height={60} />
        </Link>

        <button className={styles.burgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Image src="/icones/burger-menu.svg" alt="Menu" width={30} height={30} />
        </button>

        <ul className={styles.navLinks}>
          <li className={styles.dropdown}>
            <button onClick={() => setIsAccessibilityOpen(prev => !prev)} className={styles.dropdownToggle}>
              Accessibilité
              <Image
                src="/icones/menu-roll.svg"
                alt="Flèche"
                width={12}
                height={12}
                className={`${styles.arrowIcon} ${isAccessibilityOpen ? styles.rotate : ''}`}
              />
            </button>
            <div className={`${styles.dropdownWrapper} ${isAccessibilityOpen ? styles.dropdownVisible : ''}`}>
              <ul className={styles.dropdownMenu}>
                <li><Link href="#">PictoAccess</Link></li>
                <li><Link href="#">Référentiel</Link></li>
              </ul>
            </div>
          </li>

          <li><Link href="/festival">Festivals</Link></li>

          <li className={styles.dropdown}>
            <button onClick={() => setIsAboutOpen(prev => !prev)} className={styles.dropdownToggle}>
              À propos
              <Image
                src="/icones/menu-roll.svg"
                alt="Flèche"
                width={12}
                height={12}
                className={`${styles.arrowIcon} ${isAboutOpen ? styles.rotate : ''}`}
              />
            </button>
            <div className={`${styles.dropdownWrapper} ${isAboutOpen ? styles.dropdownVisible : ''}`}>
              <ul className={styles.dropdownMenu}>
                <li><Link href="#">Nos missions</Link></li>
                <li><Link href="#">Nos partenaires</Link></li>
                <li><Link href="#">Recrutement</Link></li>
              </ul>
            </div>
          </li>

          <li><Link href="#">Forum</Link></li>
        </ul>

        <div className={styles.authButtons}>
          <Link href="/form" className={styles.btnBlack}>Se connecter</Link>
          <Link href="/form" className={styles.btnWhite}>S'inscrire</Link>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
        <button className={styles.closeButton} onClick={() => setIsMenuOpen(false)}>
          <Image src="/icones/close-btn-menu.svg" alt="Fermer" width={24} height={24} />
        </button>

        <ul className={styles.mobileNavLinks}>
          <li>
            <button className={styles.mobileDropdownToggle} onClick={() => setIsMobileAccessibilityOpen(prev => !prev)}>
              Accessibilité
              <Image
                src="/icones/menu-roll.svg"
                alt="Flèche"
                width={12}
                height={12}
                className={`${styles.arrowIcon} ${isMobileAccessibilityOpen ? styles.rotate : ''}`}
              />
            </button>
            {isMobileAccessibilityOpen && (
              <ul className={styles.mobileDropdownMenu}>
                <li><Link href="#">PictoAccess</Link></li>
                <li><Link href="#">Référentiel</Link></li>
              </ul>
            )}
          </li>

          <li><Link href="/festival">Festivals</Link></li>

          <li>
            <button className={styles.mobileDropdownToggle} onClick={() => setIsMobileAboutOpen(prev => !prev)}>
              À propos
              <Image
                src="/icones/menu-roll.svg"
                alt="Flèche"
                width={12}
                height={12}
                className={`${styles.arrowIcon} ${isMobileAboutOpen ? styles.rotate : ''}`}
              />
            </button>
            {isMobileAboutOpen && (
              <ul className={styles.mobileDropdownMenu}>
                <li><Link href="#">Nos missions</Link></li>
                <li><Link href="#">Nos partenaires</Link></li>
                <li><Link href="#">Recrutement</Link></li>
              </ul>
            )}
          </li>

          <li><Link href="#">Forum</Link></li>
        </ul>

        <div className={styles.mobileAuthButtons}>
          <Link href="/form" className={styles.btnBlack}>Se connecter</Link>
          <Link href="/form" className={styles.btnWhite}>S'inscrire</Link>
        </div>
      </div>
    </nav>
  );
}
