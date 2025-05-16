import "../../../../dashboard/src/app/globals.css";
import Sidebar from "@/components/OrganizerDashboard/Sidebar/Sidebar";
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

export default function Layout({ children }) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${oswald.variable}`}>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
