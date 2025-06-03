import AccessibilityPictogram from "../AccessibilityPictogram/AccessibilityPictogram";
import styles from "./AccessibilityFeatures.module.scss";

export default function AccessibilityFeatures({ data = [] }) {
    return (
        <div className={styles.pictogramsContainer}>
            {data.map(({ name, title, pictogram }) => (
                <AccessibilityPictogram
                    key={name}
                    title={title}
                    pictogram={pictogram}
                />
            ))}
        </div>
    );
}