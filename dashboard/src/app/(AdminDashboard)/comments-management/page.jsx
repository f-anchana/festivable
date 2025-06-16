'use client';
import { useState, useEffect } from "react";
import { securePage } from "@/components/SecurePage/SecurePage";

import CommentsTable from "@/components/AdminDashboard/CommentsManagement/CommentsTable/CommentsTable";
import styles from "./commentsManagement.module.scss";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function CommentsManagement() {
    const [festivals, setFestivals] = useState([]);
    const [selectedFestival, setSelectedFestival] = useState("");

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const res = await fetch(`${API_URL}/festivals`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) throw new Error("Erreur lors de la récupération des festivals");
                const data = await res.json();

                //trier par ordre alphabétique
                data.sort((a, b) => {
                    const nameA = (a.title || a.name || "").toLowerCase();
                    const nameB = (b.title || b.name || "").toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                });

                setFestivals(data);

                if (data.length > 0) {
                    setSelectedFestival(data[0]._id || data[0].id); // initialiser avec le premier festival
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchFestivals();
    }, []);

    return (
        <div className={styles.container}>
            <select
                id="festivalSelect"
                value={selectedFestival}
                onChange={(e) => setSelectedFestival(e.target.value)}
            >
                {festivals.map((festival) => (
                    <option key={festival._id || festival.id} value={festival._id || festival.id}>
                        {festival.title || festival.name}
                    </option>
                ))}
            </select>
            {selectedFestival && <CommentsTable festivalId={selectedFestival} />}
        </div>
    )
}

export default securePage(CommentsManagement, ["admin"]);