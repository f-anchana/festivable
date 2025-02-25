import { useEffect, useRef, useState } from "react";
import styles from "./OrganizerSignupForm.module.css";

import { fadeInForm, nextStepAnimation } from "@/utils/AnimatedForm";

export default function OrganizerSignupForm() {
    const formRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep(prev => prev + 1); // Mise à jour de l'état
    };
    
    useEffect(() => {
        nextStepAnimation(currentStep);
    }, [currentStep]); // Exécute l'animation à chaque changement de currentStep

    useEffect(() => {
        fadeInForm(formRef.current); // Lancer l'animation à l'affichage du composant
    }, []);

    return (
        <div ref={formRef} className={`${styles.container}`}>
            <div>
                <p>étapes ...</p>
            </div>
            <form action="" className="organizer-signup-form">
                <fieldset className="step-one">
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
                    <button type="button" onClick={nextStep}>Suivant</button>
                </fieldset>

                <fieldset className={styles.stepTwo}>
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

                <fieldset className={styles.stepThree}>
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
                    <button>S'inscrire</button>
                </fieldset>
            </form>
        </div>
    );
}