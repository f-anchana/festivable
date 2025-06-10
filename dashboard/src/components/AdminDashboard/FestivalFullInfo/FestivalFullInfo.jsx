'use client';
import styles from "./FestivalFullInfo.module.scss";
import { formatDate } from "@/utils/formatDate";
import PriceList from "../PriceList/PriceList";
import RecruitmentList from "@/components/AdminDashboard/RecruitmentList/RecruitmentList";
import ImageGallery from "../ImageGallery/ImageGallery";
import ConfirmAction from "../ConfirmAction/ConfirmAction";
import { useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FestivalFullInfo(
    {
        festival,
        onClose
    }
) {
    if (!festival) return null;

    const {
        title = "Titre inconnu",
        organizer,
        state,
        start_date,
        end_date,
        link,
        address,
        pictoaccess,
        description,
        prices,
        _id
    } = festival;

    const [isModalOpen, setModalOpen] = useState(false);

    const handleValidateClick = (e) => {
        e.preventDefault();
        setModalOpen(true); // ouvre la modal
    };

    const handleValidation = async (valid) => {
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${API_URL}/festival/${_id}/set-validation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ valid }),
            });

            if (!res.ok) throw new Error("Erreur lors de la mise à jour");

            const data = await res.json();
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Fermer la fenêtre"
                >
                    ×
                </button>
                <div className={styles.flex}>

                    <div className={styles.infos}>
                        <h2>{title}</h2>
                        <p>{organizer?.organization_name || "Organisateur inconnu"}</p>
                        <div>
                            <ImageGallery festivalId={_id} />
                        </div>
                        <p>{pictoaccess ? "Certifié Pictoaccess" : "Non certifié Pictoaccess"}</p>
                        <p>Dates: <strong>{start_date ? formatDate(start_date) : "Date inconnue"} - {end_date ? formatDate(end_date) : "Date inconnue"}</strong></p>
                        <p>Addresse: <strong>{address || "adresse inconue"}</strong></p>
                        <p>Lien: <strong>{link || 'lien inconnu'}</strong></p>
                        <PriceList
                            prices={prices}
                        />
                        <RecruitmentList festivalId={_id} />
                    </div>
                    <div className={styles.description}>
                        <p>{description || "pas de description"}</p>
                    </div>

                </div>
                <form className={styles.actions}>
                    <button className={styles.refuse}>REFUSER LE FESTIVAL</button>
                    <button className={styles.validate} onClick={handleValidateClick}>VALIDER LE FESTIVAL</button>
                </form>
                <ConfirmAction
                    isOpen={isModalOpen}
                    onClose={handleCancel}
                    onConfirm={() => handleValidation(true)}
                    message="Es-tu sûr·e de vouloir valider le festival ?"
                />
            </div>

        </div>
    )
}