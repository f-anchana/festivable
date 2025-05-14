import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      {/* Images décoratives */}
      <Image
        src="/decor/homepage-deco1.png"
        alt=""
        className={styles.decor1}
        width={200}
        height={200}
      />
      <Image
        src="/decor/homepage-deco.png"
        alt=""
        className={styles.decor2}
        width={80}
        height={80}
      />
      <Image
        src="/decor/homepage-deco.png"
        alt=""
        className={styles.decor3}
        width={80}
        height={80}
      />

      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            FESTIV'<span className={styles.highlight}>ABLE</span>
          </h1>
          <h2 className={styles.subtitle}>
            CÉLÉBRONS LA RICHESSE DES FESTIVALS <span className={styles.highlight}>EN FRANCE</span>
          </h2>
          <p className={styles.description}>
            Ce site, réalisé en partenariat avec le ministère de la Culture,<br />
            vous propose un panorama complet des festivals en France.<br />
            Explorez, découvrez et partagez la culture dans toutes ses formes.
          </p>
          <div className={styles.boutons_homepage}>
            <a href="">Découvrir la programmation culturelle 🡥</a>
            <a href="">Faire certifier mon festival 🡥</a>
          </div>
        </div>

        <div className={styles.image}>
          <img src="/decor/HeroSection_image.svg" alt="Image de festival" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
