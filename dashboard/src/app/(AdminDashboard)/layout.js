import "../../../../dashboard/src/app/globals.css";
import SidebarAdmin from "@/components/AdminDashboard/SidebarAdmin/SidebarAdmin";
import ScreenWarning from "@/components/ScreenWarning/ScreenWarning";

export const metadata = {
  title: "AdminDashboard - Festivable",
  description: "Interface d’administration de Festivable permettant de gérer les festival. Un outil conçu pour faciliter la supervision et le bon fonctionnement de la plateforme.",
  icons: {
    icon: "/favicon.png", 
  },
};

export default function Layout({ children }) {
  return (
    <>
      <ScreenWarning />
      <div className="layout-wrapper">
        <SidebarAdmin />
        <main className="layout-content">{children}</main>
      </div>
    </>
  );
}
