import { useEffect, useRef  } from "react";
import styles from "./FestivalierSignupForm.module.css";

import { fadeInForm } from "@/utils/AnimatedForm";

export default function FestivalierSignupForm() {
    const formRef = useRef(null);

    useEffect(() => {
        fadeInForm(formRef.current); // Lancer l'animation à l'affichage du composant
    }, []);

    return (
        <div ref={formRef} className={`${styles.container} festivalier-signup-form`}>
            <form action="">
                <div className={styles.flex}>
                    <input type="text" placeholder="Nom" />
                    <input type="text" placeholder="Prénom" />
                </div>
                <input type="mail" placeholder="E-mail" />
                <input type="number" placeholder="numéro de telephone" />
                <input type="password" placeholder="Mot de passe" />
                <button>S'inscire</button>
            </form>
        </div>
    );
}