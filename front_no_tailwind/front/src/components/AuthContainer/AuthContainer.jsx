'use client';
import styles from "./AuthContainer.module.css";
import Image from "next/image";

import { animateForm, animateFormBack } from "@/utils/AnimatedForm";

export default function AuthContainer() {

    return (
        <div className={`${styles.background} auth-container`}>
            <div className={`${styles.orange} auth-orange`}></div>
            <div className={`${styles.lightBlue} auth-light-blue`}></div>
            <div className={styles.container}>
                <h1><span className={`${styles.highlight} span-one`}>Plongez au cœur</span><span className={`${styles.highlight} span-two`}>des festivals accessibles !</span></h1>
                <p>Vous souhaitez vivre une expérience unique et découvrir des festivals accessibles ? Rejoignez notre communauté !</p>
                <button onClick={animateForm} className={`${styles.signupbutton} signup-button`}>S’inscrire</button>
                <button onClick={animateFormBack} className={`${styles.loginbutton} login-button`}>Se connecter</button>
            </div>
            <Image src="/decor/slider-decor-1.png" alt="" width={150} height={200} className={`${styles.decor1} decor-one`} />
            <Image src="/decor/slider-decor-2.png" alt="" width={100} height={200} className={`${styles.decor2} decor-two`} />
            <Image src="/decor/slider-decor-3.png" alt="" width={80} height={90} className={`${styles.decor3} decor-three`} />
        </div>
    );
}