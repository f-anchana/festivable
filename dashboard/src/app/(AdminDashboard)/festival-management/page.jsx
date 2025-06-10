'use client';
import { securePage } from "@/components/SecurePage/SecurePage";
import FestivalTable from "@/components/AdminDashboard/FestivalTable/FestivalTable";
import FestivalFilter from "@/components/AdminDashboard/FestivalFilter/FestivalFilter";

function AdminDashboard() {
    return (
        <div>
            <FestivalFilter></FestivalFilter>
            <FestivalTable></FestivalTable>

        </div>
    );
}
export default (AdminDashboard);