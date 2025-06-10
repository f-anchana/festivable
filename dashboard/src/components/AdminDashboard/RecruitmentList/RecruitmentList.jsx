'use client';
import { useEffect, useState } from "react";
import styles from "./RecruitmentList.module.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RecruitmentList({ festivalId }) {
    const [recruitments, setRecruitments] = useState([]);

    useEffect(() => {
        const fetchRecruitments = async () => {
            try {
                const res = await fetch(`${API_URL}/recruitments/${festivalId}`);
                if (!res.ok) throw new Error("Erreur de récupération des recrutements");

                const data = await res.json();
                const recruitmentArray = data[0]?.recruitments || [];
                setRecruitments(recruitmentArray);
            } catch (err) {
                console.error(err);
                setRecruitments([]);
            }
        };

        fetchRecruitments();
    }, [festivalId]);

    if (recruitments.length === 0) return <p>Aucun recrutement disponible</p>;

    return (
        <ul className={styles.container}>
            <h3>Offres d'emploi</h3>
            {recruitments.map((recruitment) => (
                <li className={styles.job} key={recruitment._id}>
                    <strong>{recruitment.position}</strong>
                    <p>Du <strong>{new Date(recruitment.start_date).toLocaleDateString()} au {new Date(recruitment.end_date).toLocaleDateString()}</strong></p>
                    <p> <strong>{recruitment.paid ? "Rémunéré" : "Bénévole"}</strong></p>
                    <p>Contact : <strong>{recruitment.contact_email}</strong></p>
                </li>
            ))}
        </ul>
    );
}