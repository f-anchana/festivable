'use client'
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRefs = useRef([]);
  subtitleRefs.current = [];

  const addToRefs = (el) => {
    if (el && !subtitleRefs.current.includes(el)) {
      subtitleRefs.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      [titleRef.current, ...subtitleRefs.current],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.3,
      }
    );

   tl.to(
  titleRef.current.querySelector("span.highlight"),
  {
    opacity: 1,
    duration: 0.1,
    ease: "power1.out",
    scale: 1.1,
  }
);


    const description = gsap.utils.toArray(`.${styles.description}`);
    const boutons = gsap.utils.toArray(`.${styles.boutons_homepage}`);

    tl.fromTo(
      [...description, ...boutons],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      },
      "+=0.2"
    );
  }, []);

  const titleText = "FESTIV'";

  return (
    <section className={styles.hero}>
      <Image
        src="/decor/homepage-deco.png"
        alt=""
        width={80}
        height={80}
        className={styles.decor1}
      />

      <div className={styles.circleContainer}>
        <div className={styles.rotatingText}>
          <Image src="/decor/apfbadge-text.svg" alt="" width={160} height={160} />
        </div>
        <div className={styles.centerImage}>
          <Image src="/decor/apfbadge-center.png" alt="" width={50} height={50} />
        </div>
      </div>

      <Image
        src="/decor/homepage-deco1.png"
        alt=""
        width={150}
        height={150}
        className={styles.decor3}
      />

      <div className={styles.content}>
        <div className={styles.text}>
          <h1
            className={styles.title}
            ref={titleRef}
            style={{ opacity: 0, display: "inline-block" }}
          >
            {titleText}
            <span
  className={`${styles.highlight} highlight`}
              style={{ color: "#FDB74C", opacity: 0, display: "inline-block" }}
            >
              ABLE
            </span>
          </h1>

          <div className={styles.titleContainer}>
            <h2
              className={styles.titleBox}
              ref={addToRefs}
              style={{ opacity: 0 }}
            >
              CÉLÉBRONS LA RICHESSE DES FESTIVALS
            </h2>
            <h2
              className={styles.titleBox}
              ref={addToRefs}
              style={{ opacity: 0 }}
            >
              EN FRANCE
            </h2>
          </div>

          <p className={styles.description} style={{ opacity: 0 }}>
            Ce site, réalisé en partenariat avec le ministère de la Culture,
            <br />
            vous propose un panorama complet des festivals en France.
            <br />
            Explorez, découvrez et partagez la culture dans toutes ses formes.
          </p>
          <div className={styles.boutons_homepage} style={{ opacity: 0 }}>
            <a href="">Découvrir la programmation culturelle </a>
            <a href="/PictoAccess">Faire certifier mon festival </a>
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
