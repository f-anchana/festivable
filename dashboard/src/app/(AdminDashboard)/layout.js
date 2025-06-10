import "../../../../dashboard/src/app/globals.css";
import SidebarAdmin from "@/components/AdminDashboard/SidebarAdmin/SidebarAdmin";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <SidebarAdmin />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
