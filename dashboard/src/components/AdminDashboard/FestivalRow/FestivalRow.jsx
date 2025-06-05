'use client';
import styles from "./FestivalRow.module.scss";

export default function FestivalRow({
    title,
    organizer,
    state,
    start_date,
    end_date,
    link,
    pictoaccess
}) {

    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <h2>{title}</h2>
                <p className={styles.organizer}>{organizer}</p>
            </div>
            <p className={state ? styles.active : styles.inactive}>
                {state ? "Validé" : "En attente de validation"} </p>
            <div className={styles.group}>
                <p>{start_date}</p>
                <p>{end_date}</p>
                <a href={link}>{link}</a>
            </div>
            <div className={styles.actions}>
                <button>Gérer</button>
                <select
                    className={styles.pictoaccess}
                    id="pictoaccess"
                    onChange={(e) => handlePictoaccessChange(e.target.value === "true")}
                    defaultValue={pictoaccess ? "true" : "false"}
                >
                    <option value="true">Certifié Pictoaccess</option>
                    <option value="false">Non certifié Pictoaccess</option>
                </select>

            </div>

        </div>
    );
}