'use client';
import styles from "./FestivalRow.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FestivalRow({
    title,
    organizer,
    state,
    start_date,
    end_date,
    link,
    pictoaccess,
    _id,
    onManageClick
}) {

    const managePictoaccess = async (e) => {
        const newValue = e.target.value === "true";
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${API_URL}/festival/${_id}/set-pictoaccess`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ valid: newValue }),
            });
             console.log(_id);

            if (!res.ok) throw new Error("Erreur lors de la mise à jour de Pictoaccess");

            const data = await res.json();
            console.log(data.message); // ou déclenche une notification
        } catch (err) {
            console.error(err);
        }
    };


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
            <td>
                <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noopener noreferrer">{link}</a>
            </td>
            <td className={styles.actions}>
                <button onClick={onManageClick}>Gérer</button>
                <select
                    className={styles.pictoaccess}
                    id="pictoaccess"
                    defaultValue={pictoaccess === true ? "true" : "false"}
                    onChange={managePictoaccess}
                >
                    <option value="true">Certifié Pictoaccess</option>
                    <option value="false">Non certifié Pictoaccess</option>
                </select>

            </td>
        </tr>
    );
}