'use client';
import { useState } from "react";
import styles from "./SignupButtons.module.css";
import { gradientFestivalierEffect, gradientOrganismeEffect, resetFestivalierGradient, resetOrganizerGradient } from "@/utils/AnimatedForm";

import FestivalierSignupForm from "../FestivalierSignupForm/FestivalierSignupForm";
import OrganizerSignupForm from "../OrganizerSignupForm/OrganizerSignupForm";

export default function SignupButtons() {
    const [selectedRole, setSelectedRole] = useState(null);

    const handleMouseEnter = (role) => {
        if (role === "festivalier") {
            gradientFestivalierEffect();
        } else if (role === "organisme") {
            gradientOrganismeEffect();
        }
    };

    const handleMouseLeave = (role) => {
        console.log(selectedRole);
        if (selectedRole !== "festivalier") {
            resetFestivalierGradient();
        }
        if (selectedRole !== "organisme") {
            resetOrganizerGradient();
        }
    };

    const handleClick = (role) => {
        setSelectedRole(role);
        if (role === "festivalier") {
            gradientFestivalierEffect();
            resetOrganizerGradient();
        } else if (role === "organisme") {
            gradientOrganismeEffect();
            resetFestivalierGradient();
        }
    };

    return (
        <div className={`${styles.container} signup-buttons`}>
            <h2>Créer mon compte</h2>
            <div className={`${styles.buttoncontainer} btn-container`}>
                <button className={`${styles.btnFestivalier} btn-festivalier`}
                    onMouseEnter={() => handleMouseEnter("festivalier")}
                    onMouseLeave={() => handleMouseLeave("festivalier")}
                    onClick={() => handleClick("festivalier")}>
                    <div className={`${styles.btnOrange} btn-orange`}></div>
                    <img src="/icones/person.svg" alt="" />
                    Je suis un festivalier
                </button>

                <button className={`${styles.btnOrganisme} btn-organisme`}
                    onMouseEnter={() => handleMouseEnter("organisme")}
                    onMouseLeave={() => handleMouseLeave("organisme")}
                    onClick={() => handleClick("organisme")}>
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