'use client';
import { securePage } from "@/components/SecurePage/SecurePage";
import FestivalTable from "@/components/AdminDashboard/FestivalTable/FestivalTable";
import FestivalFilter from "@/components/AdminDashboard/FestivalFilter/FestivalFilter";
import styles from "./management.module.scss";

function AdminDashboard() {
    return (
        <div className={styles.container}>
            <FestivalFilter></FestivalFilter>
            <FestivalTable></FestivalTable>
        </div>
    );
}
export default (AdminDashboard);