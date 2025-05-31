import "../../../../dashboard/src/app/globals.css";
import Sidebar from "@/components/OrganizerDashboard/Sidebar/Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
