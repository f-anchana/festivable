import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <p>LOGO + BASELINE</p>
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
              <li><a href="#">Accessibilité</a></li>
              <li><a href="#">Festivals</a></li>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Forum</a></li>
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
        <p><a href="#">Mentions légales</a></p>
        <p><a href="#">Politique de confidentialité</a></p>
      </div>
    </footer>
  );
}
