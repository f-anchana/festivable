import "../globals.css";
import Sidebar from "@/components/OrganizerDashboard/Sidebar/Sidebar";
import ScreenWarning from "@/components/ScreenWarning/ScreenWarning";
import { Poppins, Oswald } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-poppins",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "Dashboard - Festivable",
  description: "Accédez à votre tableau de bord Festivable pour gérer facilement les informations de votre festival, la galerie photo, la carte interactive et les options d’accessibilité. Un espace dédié aux organisateurs pour valoriser l’inclusion et la visibilité de leur événement.",
    icons: {
    icon: "/favicon.png", 
  },
};

export default function Layout({ children }) {
  return (
    <>
      <ScreenWarning />
      <div className="layout-wrapper">
        <Sidebar />
        <main className="layout-content">{children}</main>
      </div>
    </>
  );
}
