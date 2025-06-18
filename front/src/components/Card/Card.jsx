import styles from "./Card.module.scss";

export default function Card({title, text, color}) {
    return (
            <div className={`${styles.card} ${styles[color]}`}>
                    <h2 className={styles.label}>{title}</h2>
                    <p className={styles.text}>
                        {text}
                    </p>
                </div>
    );
}