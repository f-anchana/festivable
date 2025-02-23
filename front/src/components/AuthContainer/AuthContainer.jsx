"use client";
import styles from "./AuthContainer.module.css";
import Image from "next/image";

import { gsap } from "gsap";

export default function AuthContainer() {

    const handleLoginClick = () => {
        gsap.to(".auth-container", {
            x: window.innerWidth - 600, // Déplacement vers la droite (c pas bien là faut le faire adapter...)
            duration: 0.8,
            ease: "power2.out",
        });
    };

    return (
        <div className={`${styles.background} auth-container`}>
            <div className={styles.container}>
                <h1><span className={styles.highlight}>De retour?</span><span className={styles.highlight}>laissez vous guider!</span></h1>
                <p>Retrouvez vos festivals favoris, échangez avec la communauté et préparez votre prochaine expérience accessible.</p>
                <button onClick={handleLoginClick}>Se connecter</button>
            </div>
            <Image src="/decor/slider-decor-1.png" alt="" width={150} height={200} className={styles.decor1} />
            <Image src="/decor/slider-decor-2.png" alt="" width={100} height={200} className={styles.decor2} />
            <Image src="/decor/slider-decor-3.png" alt="" width={80} height={90} className={styles.decor3} />
        </div>
    );
}