import "../../../../dashboard/src/app/globals.css";
import SidebarAdmin from "@/components/AdminDashboard/SidebarAdmin/SidebarAdmin";

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <SidebarAdmin />
      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}
