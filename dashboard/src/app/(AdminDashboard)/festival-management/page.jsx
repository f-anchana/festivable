'use client';
import { securePage } from "@/components/SecurePage/SecurePage";
import FestivalTable from "@/components/AdminDashboard/FestivalManagment/FestivalTable/FestivalTable";
import FestivalFilter from "@/components/AdminDashboard/FestivalManagment/FestivalFilter/FestivalFilter";
import styles from "./festivalManagement.module.scss";
import { useState } from "react";

function FestivalManagement() {
    const [filter, setFilter] = useState("all");

    return (
        <div className={styles.container}>
            <FestivalFilter filter={filter} setFilter={setFilter} />
            <FestivalTable filter={filter} />
        </div>
    );
}
export default (FestivalManagement);