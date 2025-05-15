import { useEffect, useRef, useState } from "react";
import styles from "./FestivalierSignupForm.module.css";
import formStyles from "../../styles/Form.module.css"

import { fadeInForm } from "@/utils/AnimatedForm";

export default function FestivalierSignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const formRef = useRef(null);

    useEffect(() => {
        fadeInForm(formRef.current); // Lancer l'animation à l'affichage du composant
    }, []);

    return (
        <div ref={formRef} className={`${styles.container} festivalier-signup-form`}>
            <form action="" className={formStyles.form}>
                <div className={styles.flex}>
                    <div className={formStyles.inputContainer}>
                        <input type="text" className={formStyles.input} id="nom" placeholder=" " required />
                        <label htmlFor="nom" className={formStyles.label}>Nom</label>
                    </div>
                    <div className={formStyles.inputContainer}>
                        <input type="text" className={formStyles.input} id="prenom" placeholder=" " required />
                        <label htmlFor="prenom" className={formStyles.label}>Prénom</label>
                    </div>
                </div>
                <div className={formStyles.inputContainer}>
                    <input type="email" className={formStyles.input} id="email" placeholder=" " required />
                    <label htmlFor="email" className={formStyles.label}>E-mail</label>
                </div>
                <div className={formStyles.inputContainer}>
                    <input type="number" className={formStyles.input} id="telephone" placeholder=" " required />
                    <label htmlFor="telephone" className={formStyles.label}>Numéro de téléphone</label>
                </div>
                <div className={formStyles.inputContainer}>
                    <input type={showPassword ? "text" : "password"} className={formStyles.input} id="password" placeholder=" " required />
                    <label htmlFor="password" className={formStyles.label}>Mot de passe</label>
                    <button type="button" aria-label="Afficher ou masquer le mot de passe" className={formStyles.showpassword} onClick={togglePassword}>
                        <img src={showPassword ? "/icones/closed-eye.svg" : "/icones/open-eye.svg"} alt="" />
                    </button>
                </div>
                <button type="submit" className={formStyles.button}>S'inscrire</button>
            </form>
        </div>
    );
}