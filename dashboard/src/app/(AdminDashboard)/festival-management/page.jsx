'use client';
import { securePage } from "@/components/SecurePage/SecurePage";
import FestivalTable from "@/components/AdminDashboard/FestivalTable/FestivalTable";

function AdminDashboard() {
    return (
        <div>
            <p>filtre</p>
            <FestivalTable></FestivalTable>
        </div>
    );
}
export default (AdminDashboard);