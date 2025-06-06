import { useEffect, useRef, useState } from "react";
import styles from "./FestivalierSignupForm.module.css";
import formStyles from "../../../styles/Form.module.css";
import InscriptionSuccess from "../InscriptionSuccess/InscriptionSuccess";

import { fadeInForm } from "@/utils/AnimatedForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FestivalierSignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [pseudo, setPseudo] = useState("");

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const formRef = useRef(null);

    useEffect(() => {
        fadeInForm(formRef.current); // Lancer l'animation à l'affichage du composant
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Récupérer les données du formulaire via FormData
        const formData = new FormData(e.target);
        const payload = {
            firstname: formData.get("nom"),
            lastname: formData.get("prenom"),
            pseudo: formData.get("pseudo"),
            email: formData.get("email"),
            phone: formData.get("telephone"),
            password: formData.get("password"),
        };

        try {
            const res = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Erreur lors de l'inscription");
            }

            setPseudo(payload.pseudo);
            setShowSuccess(true);
        } catch (error) {
            alert(`Erreur lors de l'inscription : ${error.message}\n\nRequête envoyée :\n${JSON.stringify(payload, null, 2)}`);
        }
    };

    return (
        <div ref={formRef} className={`${styles.container} festivalier-signup-form`}>
            {showSuccess ? (
                <InscriptionSuccess
                    pseudo={pseudo}
                    role="user"
                />
            ) : (
                <form onSubmit={handleSubmit} className={formStyles.form}>
                    <div className={styles.flex}>
                        <div className={formStyles.inputContainer}>
                            <input type="text" className={formStyles.input} id="nom" name="nom" placeholder=" " required />
                            <label htmlFor="nom" className={formStyles.label}>Nom</label>
                        </div>
                        <div className={formStyles.inputContainer}>
                            <input type="text" className={formStyles.input} id="prenom" name="prenom" placeholder=" " required />
                            <label htmlFor="prenom" className={formStyles.label}>Prénom</label>
                        </div>
                    </div>
                    <div className={formStyles.inputContainer}>
                        <input type="email" className={formStyles.input} id="email" name="email" placeholder=" " required />
                        <label htmlFor="email" className={formStyles.label}>E-mail</label>
                    </div>
                    <div className={formStyles.inputContainer}>
                        <input type="text" className={formStyles.input} id="pseudo" name="pseudo" placeholder=" " required />
                        <label htmlFor="pseudo" className={formStyles.label}>pseudo</label>
                    </div>
                    <div className={formStyles.inputContainer}>
                        <input type="number" className={formStyles.input} id="telephone" name="telephone" placeholder=" " required />
                        <label htmlFor="telephone" className={formStyles.label}>Numéro de téléphone</label>
                    </div>
                    <div className={formStyles.inputContainer}>
                        <input type={showPassword ? "text" : "password"} className={formStyles.input} id="password" name="password" placeholder=" " required />
                        <label htmlFor="password" className={formStyles.label}>Mot de passe</label>
                        <button type="button" aria-label="Afficher ou masquer le mot de passe" className={formStyles.showpassword} onClick={togglePassword}>
                            <img src={showPassword ? "/icones/closed-eye.svg" : "/icones/open-eye.svg"} alt="" />
                        </button>
                    </div>
                    <button type="submit" className={formStyles.button}>S'inscrire</button>
                </form>
            )}
        </div>
    );
}