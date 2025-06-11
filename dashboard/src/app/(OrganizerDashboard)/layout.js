import "../../../../dashboard/src/app/globals.css";
import Sidebar from "@/components/OrganizerDashboard/Sidebar/Sidebar";


export const metadata = {
  title: "Dashboard - Festivable",
  description: "Accédez à votre tableau de bord Festivable pour gérer facilement les informations de votre festival, la galerie photo, la carte interactive et les options d’accessibilité. Un espace dédié aux organisateurs pour valoriser l’inclusion et la visibilité de leur événement.",
    icons: {
    icon: "/favicon.png", 
  },
};

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <main className="layout-content">{children}</main>
    </div>
  );
}
