import styles from "./AccessibilityPictogram.module.scss";

export default function AccessibilityPictogram (
    {
        pictogram,
        title
    }
) {

    return(
        <div className={styles.container}>
            <img src={pictogram} alt="" />
            <p>{title}</p>
        </div>
    )
}