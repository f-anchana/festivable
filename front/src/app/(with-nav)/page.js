import Image from "next/image";
import styles from "./Homepage.module.css";
import HeroSection from "@/components/HeroSection/HeroSection";
import FestivalSection from "@/components/FestivalSection/FestivalSection";



export default function Home() {
  return (
    <div className={styles.main} >
     <HeroSection/>
     <FestivalSection />
    </div>
  );
}
