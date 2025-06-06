import "../globals.css";
import { Poppins, Oswald } from "next/font/google";
import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700"],
  variable: "--font-poppins"
});

const oswald = Oswald({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700"],
  variable: "--font-oswald"
});

export const metadata = {
  title: "Festivable — Festivals accessibles",
  description: "Festivable met en lumière l'accessibilité dans les festivals en donnant la parole aux personnes en situation de handicap à travers témoignages, vidéos et conseils pratiques.",
  icons: {
    icon: "/favicon.png", 
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${oswald.variable}`}>
      <head />
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
