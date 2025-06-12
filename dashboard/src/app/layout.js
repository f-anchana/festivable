import "./globals.css";
import { Poppins, Oswald } from "next/font/google";
import ScreenWarning from "@/components/ScreenWarning/ScreenWarning";

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
  title: "Connexion Organisateur - Festivable",
  description:
    "Connectez-vous à votre espace personnel Festivable pour gérer votre festival, accéder aux outils de configuration et publier votre contenu accessible.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function Layout({ children }) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${oswald.variable}`}>
              <ScreenWarning />
        <div style={{ display: "flex" }}>
          <main style={{ flex: 1 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}