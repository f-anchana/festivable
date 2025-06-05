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
  const accessibilityRef = useRef(null);
  const aboutRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: "#festivalSection",
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

    const handleClickOutside = (event) => {
      if (
        accessibilityRef.current &&
        !accessibilityRef.current.contains(event.target)
      ) {
        setIsAccessibilityOpen(false);
      }

      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target)
      ) {
        setIsAboutOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
          <li className={styles.dropdown} ref={accessibilityRef}>
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
                <li><Link href="/PictoAccess">PictoAccess</Link></li>
                <li><Link href="#">Référentiel</Link></li>
              </ul>
            </div>
          </li>

          <li><Link href="/AllFestivals">Festivals</Link></li>

           <li><Link href='/Apropos'>À propos</Link></li>


        </ul>

        <div className={styles.authButtons}>
          <Link href="/form" className={styles.btnBlack}>S'authentifier</Link>
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
                <li><Link href="/PictoAccess">PictoAccess</Link></li>
                <li><Link href="#">Référentiel</Link></li>
              </ul>
            )}
          </li>

          <li><Link href="/AllFestivals">Festivals</Link></li>

          <li><Link href='/Apropos'>À propos</Link></li>
          

        </ul>

        <div className={styles.mobileAuthButtons}>
          <Link href="/form" className={styles.btnBlack}>S'authentifier</Link>
        </div>
      </div>
    </nav>
  );
}
