'use client';
import styles from "@/styles/Table.module.scss";

import AccountRow from "@/components/AdminDashboard/AccountManagement/AccountRow/AccountRow";

import { useState, useEffect } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserTable() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(`${API_URL}/users`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) throw new Error("Erreur de récupération");
                const data = await res.json();
                setUsers(data);
                console.log("Données brutes API :", data); //
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <table className={styles.container}>
                <thead className={styles.head}>
                    <tr>
                        <th>ID</th>
                        <th>Pseudo</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <AccountRow
                            type="user"
                            key={user._id}
                            pseudo={user.pseudo}
                            lastname={user.lastname}
                            prenom={user.firstname}
                            email={user.email}
                            _id={user._id}
                        />
                    ))}
                </tbody>
            </table >
        </>
    );
}