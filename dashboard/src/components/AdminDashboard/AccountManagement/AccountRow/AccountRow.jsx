'use client';
import styles from "@/styles/Row.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AccountRow({
    type,
    _id,
    pseudo,
    lastname,
    prenom,
    profile_picture,
    organization_name,
    name,
    email,
    phone_number
}) {

    const handleDelete = async () => {
        const confirm = window.confirm("Es-tu sûr(e) de vouloir supprimer ?");
        if (!confirm) return;

        try {
            const token = localStorage.getItem("token");
            const endpoint = type === "organizer" ? "organizer" : "user"; // adaptatif
            const res = await fetch(`${API_URL}/${endpoint}/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Erreur lors de la suppression");

            alert(`${type === "organizer" ? "Organisateur" : "Utilisateur"} supprimé !`);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <tr className={styles.container}>

            {type === "organizer" ? (
                <>
                    <td>{organization_name}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone_number}</td>
                </>
            ) : (
                <>
                    <td><img src={`${API_URL}/${profile_picture}`} alt="Photo de profil" /></td>
                    <td>{pseudo || "N/A"}</td>
                    <td>{lastname || "N/A"}</td>
                    <td>{prenom || "N/A"}</td>
                    <td>{email || "N/A"}</td>
                </>
            )}
                        <td>{_id}</td>

            <td className={styles.actions}>
                <button className={styles.delete} onClick={handleDelete}>Supprimer</button>
            </td>
        </tr>
    );
}