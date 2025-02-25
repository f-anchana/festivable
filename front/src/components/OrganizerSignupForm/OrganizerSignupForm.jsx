import { useEffect, useRef } from "react";
import styles from "./OrganizerSignupForm.module.css";

import { fadeInForm } from "@/utils/AnimatedForm";

export default function OrganizerSignupForm() {
        const formRef = useRef(null);
    
        useEffect(() => {
            fadeInForm(formRef.current); // Lancer l'animation à l'affichage du composant
        }, []);

    return (
        <div ref={formRef} className={`${styles.container} organizer-signup-form`}>
            {/* <div>
                <p>étape 1/3</p>
            </div> */}
            <form action="">
                <div className={styles.flex}>
                    <input type="text" placeholder="Nom de l'organisme" />
                    <input type="text" placeholder="Nom et prénom du contact" />
                </div>
                <input type="mail" placeholder="E-mail" />
                <div className={styles.flex}>
                    <input type="number" placeholder="numéro de telephone" />
                    <input type="text" placeholder="Lien de contact (optionnel)" />
                </div>
                <input type="password" placeholder="Téleversement fichier" />
                <button>Suivant</button>
            </form>
        </div>
    );
}