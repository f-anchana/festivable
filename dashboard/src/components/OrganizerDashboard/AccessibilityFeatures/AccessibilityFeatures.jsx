import AccessibilityPictogram from "../AccessibilityPictogram/AccessibilityPictogram";
import styles from "./AccessibilityFeatures.module.scss";

const pictogramData = [
    {
        title: "Accès PMR",
        pictogram: "/pictograms/inactive/Wheelchair.png",
    },
    {
        title: "Boucle magnétique",
        pictogram: "/pictograms/inactive/Deaf.png",
    },
    {
        title: "Sous-titrage",
        pictogram: "/pictograms/inactive/Blind.png",
    },
    // Ajoute d'autres pictos ici
];

export default function AccessibilityFeatures() {
    return (
        <div>
            <h2>Dispositifs pour l’accessibilité</h2>
            <p>Les illustrations surlignées répondent aux critères définis par votre festival, sur la base des informations que vous avez renseignées lors de son inscription. Si vous constatez que certaines données doivent être mises à jour, n’hésitez pas à les modifier dans le menu <a href="">“Questions d’accessibilité”</a></p>

            <div className={styles.pictogramsContainer}>
                {pictogramData.map((item, index) => (
                    <AccessibilityPictogram
                        key={index}
                        title={item.title}
                        pictogram={item.pictogram}
                    />
                ))}
            </div>
        </div>
    )
}