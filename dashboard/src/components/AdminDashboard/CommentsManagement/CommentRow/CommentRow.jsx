'use client';
import styles from "@/styles/Row.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { formatDate } from "@/utils/formatDate";

export default function CommentRow({
    _id,
    pseudo,
    profile_picture,
    comment,
    date,
    disability
}) {

    const handleDelete = async () => {
        const confirm = window.confirm("Es-tu sûr(e) de vouloir supprimer ?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/comment/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Détails de l'erreur :", errorData);
                throw new Error("Erreur lors de la suppression");
            }

            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <tr className={styles.container}>
            <td><img src={`${API_URL}/${profile_picture}`} alt="Photo de profil" /></td>
            <td>{pseudo || "N/A"}</td>
            <td>{disability || "N/A"}</td>
            <td>{date ? formatDate(date) : "N/A"}</td>
            <td>{comment || "N/A"}</td>
            <td className={styles.actions}>
                <button className={styles.delete} onClick={handleDelete}>Supprimer</button>
            </td>
        </tr>
    );
}