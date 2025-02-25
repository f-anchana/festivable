'use client';
import { useState } from "react";
import styles from "./SignupButtons.module.css";
import { gradientFestivalierEffect, gradientOrganismeEffect, resetFestivalierGradient, resetOrganizerGradient } from "@/utils/AnimatedForm";

import FestivalierSignupForm from "../FestivalierSignupForm/FestivalierSignupForm";
import OrganizerSignupForm from "../OrganizerSignupForm/OrganizerSignupForm";

export default function SignupButtons() {
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <div className={`${styles.container} signup-buttons`}>
            <h2>Créer mon compte</h2>
            <div className={styles.buttoncontainer}>
                <button className={`${styles.btnFestivalier} btn-festivalier`}
                    onMouseEnter={gradientFestivalierEffect}
                    onMouseLeave={selectedRole === "festivalier" ? undefined : resetFestivalierGradient}
                    onClick={() => { setSelectedRole("festivalier");resetOrganizerGradient(); }}>
                    <div className={`${styles.btnOrange} btn-orange`}></div>
                    <img src="/icones/person.svg" alt="" />
                    Je suis un festivalier
                </button>
                <button className={`${styles.btnOrganisme} btn-organisme`}
                    onMouseEnter={gradientOrganismeEffect}
                    onMouseLeave={selectedRole === "organisme" ? undefined : resetOrganizerGradient}
                    onClick={() => { setSelectedRole("organisme");resetFestivalierGradient(); }}>
                    <div className={`${styles.btnLightBlue} btn-light-blue`}></div>
                    <img src="/icones/professional.svg" alt="" />
                    Je suis un organisme
                </button>
            </div>
            {selectedRole === "festivalier" && <FestivalierSignupForm />}
            {selectedRole === "organisme" && <OrganizerSignupForm />}
        </div>
    );
}