'use client';
import styles from "./FestivalFullInfo.module.scss";
import { formatDate } from "@/utils/formatDate";
import PriceList from "../PriceList/PriceList";
import RecruitmentList from "@/components/AdminDashboard/FestivalManagment/RecruitmentList/RecruitmentList";
import ImageGallery from "@/components/AdminDashboard/FestivalManagment/ImageGallery/ImageGallery";
import ConfirmAction from "@/components/AdminDashboard/ConfirmAction/ConfirmAction";
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
    const [modalAction, setModalAction] = useState(null);

    const handleValidateClick = (e) => {
        e.preventDefault();
        setModalAction('validate');
        setModalOpen(true);
    };

    const handleRefuseClick = (e) => {
        e.preventDefault();
        setModalAction('refuse');
        setModalOpen(true);
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
                        <p><strong>{organizer?.organization_name || "Organisateur inconnu"}</strong></p>
                        <p>Organisateur ID: <strong>{organizer?._id || "Organisateur inconnu"}</strong></p>
                        <div>
                            <ImageGallery festivalId={_id} />
                        </div>
                        <p>{pictoaccess ? "Certifié Pictoaccess" : "Non certifié Pictoaccess"}</p>
                        <p>Dates: <strong>{start_date ? formatDate(start_date) : "Date inconnue"} - {end_date ? formatDate(end_date) : "Date inconnue"}</strong></p>
                        <p>Addresse: <strong>{address || "adresse inconue"}</strong></p>
                        <p>
                            Lien: <strong>
                                {link
                                    ? <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noopener noreferrer">{link}</a>
                                    : 'Pas de lien'}
                            </strong>
                        </p>
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
                    <button className={styles.refuse} onClick={handleRefuseClick}>REFUSER LE FESTIVAL</button>
                    <button className={styles.validate} onClick={handleValidateClick}>VALIDER LE FESTIVAL</button>
                </form>

                <ConfirmAction
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => handleValidation(modalAction === 'validate')}
                    message={modalAction === 'validate'
                        ? "Es-tu sûr·e de vouloir valider le festival ?"
                        : "Es-tu sûr·e de vouloir refuser le festival ? (Si vous voulez supprimer le festival compétement il faut supprimer le compte de l'oganisateur)"}
                />

            </div>

        </div>
    )
}