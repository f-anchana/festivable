'use client';
import { securePage } from "@/components/SecurePage/SecurePage";
import FestivalTable from "@/components/AdminDashboard/FestivalManagment/FestivalTable/FestivalTable";
import FestivalFilter from "@/components/AdminDashboard/FestivalManagment/FestivalFilter/FestivalFilter";
import SearchBar from "@/components/AdminDashboard/SearchBar/SearchBar";
import styles from "./festivalManagement.module.scss";
import { useState } from "react";

function FestivalManagement() {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className={styles.container}>
            <FestivalFilter filter={filter} setFilter={setFilter} />
            <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={"Entrez le nom ou l'id d'un festival"}
            />
            <FestivalTable filter={filter} searchTerm={searchTerm} />
        </div>
    );
}
export default securePage(FestivalManagement, ["admin"]);