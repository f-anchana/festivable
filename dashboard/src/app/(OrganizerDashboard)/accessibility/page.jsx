import styles from "./accessibility.module.scss";
import RadioSection from "@/components/OrganizerDashboard/RadioSection/RadioSection";
import AccessibilityFeatures from "@/components/OrganizerDashboard/AccessibilityFeatures/AccessibilityFeatures";

const outdoorQuestions = [
    {
        name: "ramp",
        question: "Rampe présente ?",
        title: "Accès PMR",
        pictogram: "/pictograms/inactive/Wheelchair.png",
    },
    {
        name: "wideEntrance",
        question: "Entrée large ?",
        title: "Entrée large",
        pictogram: "/pictograms/inactive/Blind.png",
    },
    {
        name: "BigDoor",
        question: "Grosse porte ?",
        title: "Grande porte",
        pictogram: "/pictograms/inactive/Deaf.png",
    },
];

function Accessibility() {

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
                        Pour modifier ces données, contactez le XX XX XX XX ou écrivez à l’adresse suivante : [adresse e-mail].
                    </p>
                </div>

            </div>
            <div className={styles.flex}>
                <RadioSection title="Accès extérieur" questions={outdoorQuestions} />
                <AccessibilityFeatures data={outdoorQuestions} />
            </div>
                        <div className={styles.flex}>
                <RadioSection title="Accès extérieur" questions={outdoorQuestions} />
                <AccessibilityFeatures data={outdoorQuestions} />
            </div>
        </div>
    );
}

export default Accessibility;