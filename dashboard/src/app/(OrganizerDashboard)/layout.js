import "../../../../dashboard/src/app/globals.css";
import Sidebar from "@/components/OrganizerDashboard/Sidebar/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <main className="layout-content">{children}</main>
    </div>
  );
}
