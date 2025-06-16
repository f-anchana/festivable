'use client';
import styles from "@/styles/Table.module.scss";

import AccountRow from "@/components/AdminDashboard/AccountManagement/AccountRow/AccountRow";

import { useState, useEffect } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OrganizerTable({searchTerm}) {

    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrganizer = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(`${API_URL}/dashboards`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) throw new Error("Erreur de récupération");
                const data = await res.json();

                // Filtrage côté front : on garde uniquement les organizers
                const organizers = data.filter(user => user.role === "organizer");

                setOrganizations(organizers);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOrganizer();
    }, []);

        const filteredOrganizations = organizations.filter(org => {
        const lowerSearch = searchTerm.toLowerCase();
        const nameMatch = org.organization_name?.toLowerCase().includes(lowerSearch);
        const idMatch = org._id?.toLowerCase().includes(lowerSearch);
        return nameMatch || idMatch;
    });

    return (
        <>
            <table className={styles.container}>
                <thead className={styles.head}>
                    <tr>
                        <th>Organisation</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Numéro</th>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrganizations.map((organization) => (
                        <AccountRow
                            type="organizer"
                            key={organization._id}
                            organization_name={organization.organization_name || "Organisateur inconnu"}
                            name={organization.name}
                            email={organization.email}
                            phone_number={organization.phone_number}
                            _id={organization._id}
                        />
                    ))}
                </tbody>
            </table >
        </>
    );
}