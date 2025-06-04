import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <a href="/festival">
              <Image src="/logo/Logo_Festivable_white.svg" alt="Accueil" width={80} height={60} />
            </a>
          
            
          </div>
          <div className={styles.socials}>
            <h2>NOS RÉSEAUX</h2>
            <div className={styles.icons}>
              <a href="#"><img src="/icones/insta-icon.svg" alt="Instagram" /></a>
              <a href="#"><img src="/icones/tiktok-icon.svg" alt="TikTok" /></a>
              <a href="#"><img src="/icones/facebook-icon.svg" alt="Facebook" /></a>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.links}>
            <h2>PLAN DE SITE</h2>
            <ul>
              <li><a href="/PictoAccess">Accessibilité</a></li>
              <li><a href="/Allfestivals">Festivals</a></li>
              <li><a href="/Apropos">À propos</a></li>
            </ul>
          </div>
          <div className={styles.contact}>
            <h2>NOUS CONTACTER</h2>
            <p><a href="mailto:contact@festivable.com">contact@festivable.com</a></p>
            <p>+ 01 44 50 75 01</p>
            <p>+ 01 44 50 75 01</p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>©2025 Festivable</p>
        <p><Link href="/mentionLegale">Mentions légales</Link></p>
        <p><Link href="/politiqueConfidentialite">Politique de confidentialité</Link></p>
      </div>
    </footer>
  );
}
