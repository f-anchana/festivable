import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";


const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>FESTIV'<span className={styles.highlight}>ABLE</span></h1>
          <h2>TOUS ENSEMBLE, CÉLÉBRONS !</h2>
        </div>
        <div className={styles.image}>
          <img src="decor/HeroSection_image.svg" alt="Image de festival" />
        </div>
      </div>
    </section>
  );
  
};

export default HeroSection;
