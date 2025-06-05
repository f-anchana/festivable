import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      
  <Image src="/decor/homepage-deco.png" alt="" width={80} height={80} className={styles.decor1} />


     
  <Image src="decor/apfbadge.svg" alt="" width={170} height={170} className={styles.decor2}/>



  <Image src="/decor/homepage-deco1.png" alt="" width={200} height={200} className={styles.decor3}/>


      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            FESTIV'<span className={styles.highlight}>ABLE</span>
          </h1>
          <div className={styles.titleContainer}>
  <h2 className={styles.titleBox}>CÉLÉBRONS LA RICHESSE DES FESTIVALS</h2>
  <h2 className={styles.titleBox}>EN FRANCE.</h2>
</div>

          <p className={styles.description}>
            Ce site, réalisé en partenariat avec le ministère de la Culture,<br />
            vous propose un panorama complet des festivals  en France.<br />
            Explorez, découvrez et partagez la culture dans toutes ses formes.
          </p>
          <div className={styles.boutons_homepage}>
            <a href="">Découvrir la programmation culturelle </a>
            <a href="">Faire certifier mon festival </a>
          </div>
        </div>

        <div className={styles.image}>
          <img src="/decor/HeroSection_image.svg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
