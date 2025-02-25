'use client';
import styles from "./SignupForm.module.css";
import { gradientFestivalierEffect, gradientOrganismeEffect, resetGradient } from "@/utils/AnimatedForm";

export default function SignupForm() {
    return (
        <div className={`${styles.container} signup-form`}>
            <h2>Créer mon compte</h2>
            <div className={styles.buttoncontainer}>
                <button className={`btn-festivalier`} onMouseEnter={gradientFestivalierEffect} onMouseLeave={resetGradient}>
                    <div className={`${styles.btnOrange} btn-orange`}></div>
                    <img src="/icones/person.svg" alt=""/>
                    Je suis un festivalier
                </button>
                <button className={`btn-organisme`} onMouseEnter={gradientOrganismeEffect} onMouseLeave={resetGradient}>
                <div className={`${styles.btnLightBlue} btn-light-blue`}></div>
                    <img src="/icones/professional.svg" alt="" />
                    Je suis un organisme
                </button>
            </div>
        </div>
    );
}