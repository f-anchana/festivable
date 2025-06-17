'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Header.module.css';



const API_URL = process.env.NEXT_PUBLIC_API_URL;
gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isMobileAccessibilityOpen, setIsMobileAccessibilityOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileUserDropdownOpen, setIsMobileUserDropdownOpen] = useState(false);

  const accessibilityRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`${API_URL}/user-profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(setUser)
      .catch(err => console.error('Erreur profil :', err));
  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: "#festivalSection",
      start: "top top",
      end: "bottom top",
      onEnter: () => gsap.to(navbarRef.current, { backgroundColor: "#fff", duration: 0.4 }),
      onLeaveBack: () => gsap.to(navbarRef.current, { backgroundColor: "transparent", duration: 0.4 })
    });

    const handleClickOutside = (e) => {
      if (accessibilityRef.current && !accessibilityRef.current.contains(e.target)) {
        setIsAccessibilityOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

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
          <li><Link href="/Apropos">À propos</Link></li>
        </ul>

        <div className="auth-buttons">
          {user ? (
            <div className={styles.userDropdown } ref={userDropdownRef}>
              <button onClick={() => setIsUserDropdownOpen(prev => !prev)} className={styles.userToggle}>
                {user.profile_picture && (
                  <Image src={`${API_URL}/${user.profile_picture}`} alt="Avatar" width={40} height={40} className={styles.avatar} />
                )}
                <span className={styles.pseudo}>{user.pseudo}</span>
                <img
                  src="/icones/menu-roll.svg"
                  alt="Flèche"
      className={`${styles.arrowIcon} ${isUserDropdownOpen ? styles.rotate : ''}`}
                  width={12}
                  height={12}
                />
              </button>

              {isUserDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li><Link href="/Profil">Profil</Link></li>
                  <li><button onClick={handleLogout} className={styles.logoutBtn}>Se déconnecter</button></li>
                </ul>
              )}
            </div>
          ) : (
            <Link href="/form" className={styles.btnBlack}>S'authentifier</Link>
          )}
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
        <button className={styles.closeButton} onClick={() => setIsMenuOpen(false)}>
          <Image src="/icones/close-btn-menu.svg" alt="Fermer" width={24} height={24} />
        </button>

        <ul className={styles.mobileNavLinks}>
          <li>
            <button
              onClick={() => setIsMobileAccessibilityOpen(prev => !prev)}
              className={styles.mobileDropdownToggle}
            >
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
                <li><Link href="/PictoAccess" onClick={() => setIsMenuOpen(false)}>PictoAccess</Link></li>
                <li><Link href="#" onClick={() => setIsMenuOpen(false)}>Référentiel</Link></li>
              </ul>
            )}
          </li>
          <li><Link href="/AllFestivals" onClick={() => setIsMenuOpen(false)}>Festivals</Link></li>
          <li><Link href="/Apropos" onClick={() => setIsMenuOpen(false)}>À propos</Link></li>
        </ul>

        <div className={styles.userDropdown} ref={userDropdownRef}>
          {user ? (
            <>
              <button onClick={() => setIsMobileUserDropdownOpen(prev => !prev)} className={styles.userToggle}>
                {user.profile_picture && (
                  <Image src={`${API_URL}/${user.profile_picture}`} alt="Avatar" width={40} height={30} className={styles.avatar} />
                )}
                <span className={styles.pseudo}>{user.pseudo}</span>
                <img
                  src="/icones/menu-roll.svg"
                  alt="Flèche"
                  className={`${styles.arrowIcon} ${isMobileUserDropdownOpen ? styles.rotate : ''}`}
                  width={12}
                  height={12}
                />
              </button>

              {isMobileUserDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li><Link href="/Profil">Profil</Link></li>
                  <li><button onClick={handleLogout} className={styles.logoutBtn}>Se déconnecter</button></li>
                </ul>
              )}
            </>
          ) : (
            <Link href="/form" className={styles.btnBlack} onClick={() => setIsMenuOpen(false)}>
              S'authentifier
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
