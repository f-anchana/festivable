import styles from "./AuthContainer.module.css";
import Image from "next/image";

export default function AuthContainer() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <h1><span className={styles.highlight}>De retour?</span><span className={styles.highlight}>laissez vous guider!</span></h1>
                <p>Retrouvez vos festivals favoris, échangez avec la communauté et préparez votre prochaine expérience accessible.</p>
                <button>Se connecter</button>
            </div>
            <Image src="/decor/slider-decor-1.png" alt="" width={150} height={200} className={styles.decor1}/>
                <Image src="/decor/slider-decor-2.png" alt="" width={100} height={200} className={styles.decor2}/>
                <Image src="/decor/slider-decor-3.png" alt="" width={80} height={90} className={styles.decor3}/>
        </div>
    );
}