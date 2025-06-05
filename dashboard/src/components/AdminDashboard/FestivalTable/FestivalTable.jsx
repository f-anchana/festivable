'use client';
import styles from "./FestivalTable.module.scss";
import FestivalRow from "../FestivalRow/FestivalRow";

import { useState, useEffect } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FestivalTable() {

    const [festivals, setFestivals] = useState([]);

    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const res = await fetch(`${API_URL}/festivals`);
                if (!res.ok) throw new Error("Erreur de récupération");
                const data = await res.json();
                setFestivals(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFestival();
    }, []);

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.group}>
                    <h2>Nom</h2>
                    <h2>Organisation</h2>
                </div>
                <h2>Etat</h2>
                <div className={styles.group}>
                    <h2>Date début</h2>
                    <h2>Date fin</h2>
                    <h2>Lien</h2>
                </div>
                <div className={styles.group}>
                    <h2>Actions</h2>
                </div>

            </div>
            {festivals.map((festival) => (
                <FestivalRow
                    key={festival._id}
                    title={festival.title}
                    organizer={festival.organizer.organization_name}
                    start_date={formatDate(festival.start_date)}
                    end_date={formatDate(festival.end_date)}
                    state={festival.valid}
                    link={festival.link}
                    pictoaccess={festival.pictoaccess}
                />
            ))}
        </div>
    );
}