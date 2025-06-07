import styles from "./AccessibilityPictogram.module.scss";

export default function AccessibilityPictogram (
    {
        pictogram,
        title,
        active = false
    }
) {

    return(
        <div className={styles.container}>
            <img src={pictogram} alt="" className={`${active ? styles.active : ""}`}/>
            <p>{title}</p>
        </div>
    )
}