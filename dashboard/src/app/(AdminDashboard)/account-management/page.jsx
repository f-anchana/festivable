'use client';
import styles from "./accountManagement.module.scss";
import OrganizerTable from "@/components/AdminDashboard/AccountManagement/OrganizerTable/OrganizerTable";
import UserTable from "@/components/AdminDashboard/AccountManagement/UserTable/UserTable";

import { useState } from "react";

function AccountManagement() {
    const [activeTable, setActiveTable] = useState("organizer");

    return (
        <div className={styles.container}>
            <div className={styles.switchButtons}>
                <button
                    className={activeTable === "organizer" ? styles.active : ""}
                    onClick={() => setActiveTable("organizer")}
                >
                    Organisateurs
                </button>
                <button
                    className={activeTable === "user" ? styles.active : ""}
                    onClick={() => setActiveTable("user")}
                >
                    Utilisateurs
                </button>
            </div>

            {activeTable === "organizer" ? ( <OrganizerTable />) : (<UserTable />)}
        </div>
    );
}
export default (AccountManagement);