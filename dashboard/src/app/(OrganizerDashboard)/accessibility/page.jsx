'use client';
import styles from "./accessibility.module.scss";
import RadioSection from "@/components/OrganizerDashboard/RadioSection/RadioSection";
import AccessibilityFeatures from "@/components/OrganizerDashboard/AccessibilityFeatures/AccessibilityFeatures";
import { pmrQuestions, sensorialQuestions, mentalQuestions, pmrPictograms, sensorialPictograms, mentalPictograms } from "./accessibilityQuestions";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { useState, useEffect } from "react";

function Accessibility() {

    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchAnswers = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch(`${API_URL}/my-answers`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Erreur lors de la récupération des réponses");

                const data = await res.json();

                // Ici on stocke uniquement les vraies réponses dans le state
                setAnswers(data.answers || {});

            } catch (err) {
                console.error(err);
            }
        };

        fetchAnswers();
    }, []);

    const handleAnswerChange = async (questionId, value) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const newAnswers = {
                ...answers,
                [questionId]: value,
            };

    console.log("Requête envoyée au backend :", JSON.stringify({ answers: newAnswers }, null, 2));

            const res = await fetch(`${API_URL}/answer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ answers: newAnswers }),
            });

            if (!res.ok) throw new Error("Échec de la mise à jour");

            await res.json();

            setAnswers(newAnswers);

        } catch (err) {
            console.error("Erreur update réponse:", err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.flex}>
                <div className={styles.paragrapheOne}>
                    <h2>Questions d’accessibilité</h2>
                    <p>Les réponses présentées ci-dessous correspondent au formulaire que vous avez rempli lors de votre inscription. Elles nous permettent d’afficher clairement, sous forme de symboles, les dispositifs en place sur la page publique du festival, et d’informer les festivaliers sur les conditions d’accueil spécifiques.
                    </p>
                    <p>
                        Pour aller plus loin et obtenir un diagnostic complet, rendez-vous dans la section <a href="#">“Picto Access”</a>.
                    </p>
                </div>
                <div className={styles.paragrapheTwo}>
                    <h2>Symbole d’accessibilité</h2>
                    <p>Les illustrations surlignées ci-dessous répondent aux critères définis par votre festival, sur la base des informations que vous avez fournies lors de son inscription.
                    </p>
                    <p>
                        Pour modifier ces données, contactez le XX XX XX XX ou écrivez à l’adresse suivante : contact@festivable.fr
                    </p>
                </div>

            </div>
            <form action="">
                <div className={styles.flex}>
                    <RadioSection
                        title="Pour les handicaps moteurs, personnes à mobilité réduite et maladies invalidantes :
"
                        questions={pmrQuestions}
                        answers={answers}
                        onAnswerChange={handleAnswerChange}
                    />
                    <AccessibilityFeatures data={pmrPictograms} answers={answers} />
                </div>
                <div className={styles.flex}>
                    <RadioSection
                        title="Pour les déficiences sensorielles (malentendants / sourds ; malvoyants / aveugles) :
"
                        questions={sensorialQuestions}
                        answers={answers}
                        onAnswerChange={handleAnswerChange} />
                    <AccessibilityFeatures data={sensorialPictograms} answers={answers} />
                </div>
                <div className={styles.flex}>
                    <RadioSection
                        title="Pour les handicaps psychiques / intellectuels ou mentaux / cognitifs :
"
                        questions={mentalQuestions}
                        answers={answers}
                        onAnswerChange={handleAnswerChange}
                    />
                    <AccessibilityFeatures data={mentalPictograms} answers={answers}/>
                </div>
            </form>
        </div>
    );
}

export default Accessibility;