'use client';
import styles from "./accountManagement.module.scss";
import OrganizerTable from "@/components/AdminDashboard/AccountManagement/OrganizerTable/OrganizerTable";
import UserTable from "@/components/AdminDashboard/AccountManagement/UserTable/UserTable";
import SearchBar from "@/components/AdminDashboard/SearchBar/SearchBar";
import { securePage } from "@/components/SecurePage/SecurePage";

import { useState } from "react";

function AccountManagement() {
    const [activeTable, setActiveTable] = useState("organizer");
    const [searchTerm, setSearchTerm] = useState("");

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

            <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Rechercher ${activeTable === "organizer" ? "un organisateur" : "un utilisateur"}`}
            />

            {activeTable === "organizer" ? (<OrganizerTable searchTerm={searchTerm} />) : (<UserTable searchTerm={searchTerm} />)}
        </div>
    );
}
export default securePage(AccountManagement, ["admin"]);