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
        <tr className={styles.container}>
            {/* <td className={styles.group}> */}
                <td className={styles.title}>{title}</td>
                <td className={styles.organizer}>{organizer}</td>
            {/* </td> */}
            <td><p className={state ? styles.active : styles.inactive}>
                {state ? "Validé" : "En attente de validation"} </p></td>
                <td>{start_date}</td>
                <td>{end_date}</td>
                <td><a href={link}>{link}</a></td>
            <td className={styles.actions}>
                <button>Gérer</button>
                <select
                    className={styles.pictoaccess}
                    id="pictoaccess"
                    // onChange={(e) => handlePictoaccessChange(e.target.value === "true")}
                    defaultValue={pictoaccess ? "true" : "false"}
                >
                    <option value="true">Certifié Pictoaccess</option>
                    <option value="false">Non certifié Pictoaccess</option>
                </select>

            </td>

        </tr>
    );
}