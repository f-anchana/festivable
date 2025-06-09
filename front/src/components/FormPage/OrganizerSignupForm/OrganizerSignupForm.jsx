import { useEffect, useRef, useState } from "react";
import styles from "./OrganizerSignupForm.module.css";
import formStyles from "@/styles/Form.module.css";
import Image from "next/image";
import InscriptionSuccess from "../InscriptionSuccess/InscriptionSuccess";

import { fadeInForm, nextStepAnimation, centerForm } from "@/utils/AnimatedForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OrganizerSignupForm() {
    const formRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const nextStep = () => {
        setCurrentStep(prev => prev + 1); // Mise à jour de l'état
    };

    const previousStep = () => {
        setCurrentStep(prev => prev - 1); // Mise à jour de l'état
    };

    useEffect(() => {
        nextStepAnimation(currentStep - 1);
        centerForm(currentStep);
    }, [currentStep]); // Exécute l'animation à chaque changement de currentStep

    useEffect(() => {
        fadeInForm(formRef.current); // Lancer l'animation à l'affichage du composant
    }, []);

    const sendData = async (event) => {

        const form = event.target;
        const data = {
            organization_name: form.elements.organisme.value,
            name: form.elements.contact.value,
            email: form.elements.email.value,
            phone_number: form.elements.telephone.value,
            password: form.elements.password.value,
            role: "organizer",
        };
        console.log("Données envoyées :", data);


        try {
            const res = await fetch(`${API_URL}/organization`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Erreur lors de l'enregistrement");
            }

            const result = await res.json();
            setShowSuccess(true);
        } catch (err) {
            alert("Erreur : " + err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        // Liste des noms des questions radios à vérifier
        const questionNames = [
            "fauteuils",
            "stationnementPMR",
            "toilettes",
            "serviceAccompagnement",
            "signaletique",
            "langueDesSignes",
            "placesAssises",
            "contenusAccessibles",
        ];

        let unanswered = [];
        let countNo = 0;

        questionNames.forEach((name) => {
            const radios = form.elements[name];
            let answered = false;
            let value = null;

            // radios peut être une NodeList ou un élément unique (si un seul bouton) 
            if (radios.length === undefined) {
                // 1 seul bouton (rare pour radios)
                answered = radios.checked;
                value = radios.checked ? radios.value : null;
            } else {
                // Plusieurs boutons radios
                for (let radio of radios) {
                    if (radio.checked) {
                        answered = true;
                        value = radio.value;
                        break;
                    }
                }
            }

            if (!answered) {
                unanswered.push(name);
            } else if (value === "non") {
                countNo++;
            }
        });

        if (unanswered.length > 0) {
            setErrorMsg("Merci de répondre à toutes les questions.");
            return;
        }

        if (countNo > 5) {
            setErrorMsg("Malheureusement, votre festival ne correspond pas aux critères d’accessibilité.");
            return;
        }

        // Pas d’erreur
        setErrorMsg("");
        sendData(e);
    };

    return (
        <div ref={formRef} className={`${styles.container}`}>
            <button className={styles.btnPrevious}
                onClick={previousStep}
                style={{ visibility: currentStep >= 2 ? "visible" : "hidden" }}>
                <Image src="/icones/previous.png" alt="" width={12} height={20} />
                Précédent</button>
            <p className={styles.step}>Étape {currentStep}/3</p>
            <div className={`${styles.progressContainer} progress-container`}>
                <div className={`${styles.progressBar} progress-bar`}></div>
            </div>
            {showSuccess ? (
                <InscriptionSuccess
                    role="organizer"
                />
            ) : (
                <form onSubmit={handleSubmit} className={`${formStyles.form} organizer-signup-form`}>
                    <fieldset className="step-one" style={{ visibility: currentStep === 1 ? "visible" : "hidden" }}>
                        <div className={styles.flex}>
                            <div className={formStyles.inputContainer}>
                                <input name="organization_name" type="text" className={formStyles.input} id="organisme" placeholder=" " required />
                                <label htmlFor="organisme" className={formStyles.label}>Nom de l'organisme</label>
                            </div>
                            <div className={formStyles.inputContainer}>
                                <input type="text" className={formStyles.input} id="contact" placeholder=" " required />
                                <label htmlFor="contact" className={formStyles.label}>Nom et prénom du contact</label>
                            </div>
                        </div>
                        <div className={formStyles.inputContainer}>
                            <input name="email" type="email" className={formStyles.input} id="email" placeholder=" " required />
                            <label htmlFor="email" className={formStyles.label}>E-mail</label>
                        </div>
                        <div className={formStyles.inputContainer}>
                            <input name="phone_number" type="number" className={formStyles.input} id="telephone" placeholder=" " required />
                            <label htmlFor="telephone" className={formStyles.label}>Numéro de téléphone</label>
                        </div>
                        <div className={formStyles.inputContainer}>
                            <input name="password" type={showPassword ? "text" : "password"} className={formStyles.input} id="password" placeholder=" " required />
                            <label htmlFor="password" className={formStyles.label}>Mot de passe</label>
                            <button type="button" aria-label="Afficher ou masquer le mot de passe" className={formStyles.showpassword} onClick={togglePassword}>
                                <img src={showPassword ? "/icones/closed-eye.svg" : "/icones/open-eye.svg"} alt="" />
                            </button>
                        </div>
                        <button type="button" onClick={nextStep}>Suivant</button>
                    </fieldset>

                    <fieldset className={styles.stepTwo} style={{ visibility: currentStep === 2 ? "visible" : "hidden" }}>
                        <div className={styles.question}>
                            <p>Le site est-il accessible aux fauteuils roulants ?</p>
                            <div className={styles.radioGroup}>
                                <label>
                                    Oui<input type="radio" name="fauteuils" value="oui" />
                                </label>
                                <label>
                                    Non<input type="radio" name="fauteuils" value="non" />
                                </label>
                            </div>
                        </div>
                        <div className={styles.question}>
                            <p>Y a-t-il des places de stationnement réservés aux PMR  (Personnes à mobilité Réduite)?</p>
                            <div className={styles.radioGroup}>
                                <label>
                                    Oui<input type="radio" name="stationnementPMR" value="oui" />
                                </label>
                                <label>
                                    Non<input type="radio" name="stationnementPMR" value="non" />
                                </label>
                            </div>
                        </div>
                        <div className={styles.question}>
                            <p>Des toilettes accessibles sont-elles disponibles ?</p>
                            <div className={styles.radioGroup}>
                                <label>
                                    Oui<input type="radio" name="toilettes" value="oui" />
                                </label>
                                <label>
                                    Non<input type="radio" name="toilettes" value="non" />
                                </label>
                            </div>
                        </div>
                        <div className={styles.question}>
                            <p>Un service d’accompagnement pour les personnes en situation de handicap est-il proposé ?</p>
                            <div className={styles.radioGroup}>
                                <label>
                                    Oui<input type="radio" name="serviceAccompagnement" value="oui" />
                                </label>
                                <label>
                                    Non<input type="radio" name="serviceAccompagnement" value="non" />
                                </label>
                            </div>
                        </div>
                        <button type="button" onClick={nextStep}>Suivant</button>
                    </fieldset>

                    <fieldset className={styles.stepThree} style={{ visibility: currentStep === 3 ? "visible" : "hidden" }}>
                        <div className={styles.question}>
                            <p>Y a-t-il une signalétique adaptée pour les personnes malvoyantes (braille, balises sonores) ?</p>
                            <div className={styles.radioGroup}>
                                <label>
                                    Oui<input type="radio" name="signaletique" value="oui" />
                                </label>
                                <label>
                                    Non<input type="radio" name="signaletique" value="non" />
                                </label>
                            </div>
                        </div>
                        <div className={styles.question}>
                            <p>Des interprètes en langue des signes seront-ils présents ?</p>
                            <div className={styles.radioGroup}>
                                <label>
                                    Oui<input type="radio" name="langueDesSignes" value="oui" />
                                </label>
                                <label>
                                    Non<input type="radio" name="langueDesSignes" value="non" />
                                </label>
                            </div>
                        </div>
                        <div className={styles.question}>
                            <p>Des places assises adaptées sont-elles prévues ?</p>
                            <div className={styles.radioGroup}>
                                <label>
                                    Oui<input type="radio" name="placesAssises" value="oui" />
                                </label>
                                <label>
                                    Non<input type="radio" name="placesAssises" value="non" />
                                </label>
                            </div>
                        </div>
                        <div className={styles.question}>
                            <p>Le festival propose-t-il des contenus accessibles (audiodescription, sous-titres) ?</p>
                            <div className={styles.radioGroup}>
                                <label>
                                    Oui<input type="radio" name="contenusAccessibles" value="oui" />
                                </label>
                                <label>
                                    Non<input type="radio" name="contenusAccessibles" value="non" />
                                </label>
                            </div>
                        </div>
                        {errorMsg && <p style={{ color: "red", marginTop: "1rem" }}>{errorMsg}</p>}
                        <button type="submit">S'inscrire</button>
                    </fieldset>
                </form>
            )}

        </div>
    );
}