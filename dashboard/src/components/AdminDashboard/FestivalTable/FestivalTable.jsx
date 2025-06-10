'use client';
import styles from "./FestivalTable.module.scss";
import FestivalRow from "../FestivalRow/FestivalRow";
import FestivalFullInfo from "@/components/AdminDashboard/FestivalFullInfo/FestivalFullInfo";

import { formatDate } from "@/utils/formatDate";

import { useState, useEffect } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FestivalTable({ filter }) {

    const [festivals, setFestivals] = useState([]);
    const [selectedFestivalId, setSelectedFestivalId] = useState(null);

    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const res = await fetch(`${API_URL}/festivals`);
                if (!res.ok) throw new Error("Erreur de récupération");
                const filteredFestivals = festivals.filter(festival => {
                    if (filter === "valid") return festival.valid === true;
                    if (filter === "invalid") return festival.valid === false;
                    return true;
                });

                const data = await res.json();
                setFestivals(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFestival();
    }, []);

    return (
        <>
            <table className={styles.container}>
                <thead className={styles.head}>
                    <tr>
                        <th>Nom</th>
                        <th>Organisation</th>
                        <th>Etat</th>
                        <th>Date début</th>
                        <th>Date fin</th>
                        <th>Lien</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {festivals.map((festival) => (
                        <FestivalRow
                            key={festival._id}
                            title={festival.title || "Titre inconnu"}
                            organizer={festival.organizer?.organization_name || "Organisateur inconnu"}
                            start_date={festival.start_date ? formatDate(festival.start_date) : "Date inconnue"}
                            end_date={festival.end_date ? formatDate(festival.end_date) : "Date inconnue"}
                            state={festival.valid ?? "État inconnu"}
                            link={festival.link || "Lien inconnu"}
                            pictoaccess={festival.pictoaccess || "Non spécifié"}
                            onManageClick={() => setSelectedFestivalId(festival._id)}
                        />
                    ))}
                </tbody>
            </table >

            {selectedFestivalId && (
                <FestivalFullInfo
                    festival={festivals.find(f => f._id === selectedFestivalId)}
                    onClose={() => setSelectedFestivalId(null)}
                />
            )}
        </>
    );
}