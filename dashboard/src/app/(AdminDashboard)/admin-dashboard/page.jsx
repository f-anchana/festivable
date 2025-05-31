'use client';
import { securePage } from "@/components/SecurePage/SecurePage";

function AdminDashboard() {
    return (
            <div>
                <h1>Hello Admin</h1>
            </div>
    );
}
export default securePage(AdminDashboard, ["admin"]);