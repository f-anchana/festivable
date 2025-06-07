import AccessibilityPictogram from "../AccessibilityPictogram/AccessibilityPictogram";
import styles from "./AccessibilityFeatures.module.scss";

export default function AccessibilityFeatures({ data = [], answers = {} }) {
  return (
    <div className={styles.pictogramsContainer}>
      {data.map(({ title, pictogram, conditions }) => {
        // Vérifie si toutes les conditions sont remplies (true)
        const active = conditions?.every(cond => answers[cond] === true);

        return (
          <AccessibilityPictogram
            key={title}
            title={title}
            pictogram={pictogram}
            active={active} // Passe la prop active
          />
        );
      })}
    </div>
  );
}