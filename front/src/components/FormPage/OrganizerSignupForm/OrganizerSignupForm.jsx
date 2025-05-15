import { useEffect, useRef, useState } from "react";
import styles from "./OrganizerSignupForm.module.css";
import formStyles from "../../../styles/Form.module.css";
import Image from "next/image";

import { fadeInForm, nextStepAnimation, centerForm } from "@/utils/AnimatedForm";

export default function OrganizerSignupForm() {
    const formRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);

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
            <form action="" className={`${formStyles.form} organizer-signup-form`}>
                <fieldset className="step-one" style={{ visibility: currentStep === 1 ? "visible" : "hidden" }}>
                    <div className={styles.flex}>
                        <div className={formStyles.inputContainer}>
                            <input type="text" className={formStyles.input} id="organisme" placeholder=" " required />
                            <label htmlFor="organisme" className={formStyles.label}>Nom de l'organisme</label>
                        </div>
                        <div className={formStyles.inputContainer}>
                            <input type="text" className={formStyles.input} id="contact" placeholder=" " required />
                            <label htmlFor="contact" className={formStyles.label}>Nom et prénom du contact</label>
                        </div>
                    </div>
                    <div className={formStyles.inputContainer}>
                        <input type="email" className={formStyles.input} id="email" placeholder=" " required />
                        <label htmlFor="email" className={formStyles.label}>E-mail</label>
                    </div>
                    <div className={styles.flex}>
                        <div className={formStyles.inputContainer}>
                            <input type="number" className={formStyles.input} id="telephone" placeholder=" " required />
                            <label htmlFor="telephone" className={formStyles.label}>Numéro de téléphone</label>
                        </div>
                        <div className={formStyles.inputContainer}>
                            <input type="text" className={formStyles.input} id="lien-contact" placeholder=" " />
                            <label htmlFor="lien-contact" className={formStyles.label}>Lien de contact (optionnel)</label>
                        </div>
                    </div>
                    <div className={formStyles.inputContainer}>
                        <input type={showPassword ? "text" : "password"} className={formStyles.input} id="password" placeholder=" " required />
                        <label htmlFor="password" className={formStyles.label}>Mot de passe</label>
                        <button type="button" aria-label="Afficher ou masquer le mot de passe" className={formStyles.showpassword} onClick={togglePassword}>
                            <img src={showPassword ? "/icones/closed-eye.svg" : "/icones/open-eye.svg"} alt="" />
                        </button>
                    </div>
                    <div className={formStyles.inputContainerfile}>
                        <input type="file" className={formStyles.inputfile} id="file-upload" required />
                        <label htmlFor="file-upload" className={formStyles.label}>Joindre une image ou un PDF</label>
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
                    <button>S'inscrire</button>
                </fieldset>
            </form>
        </div>
    );
}