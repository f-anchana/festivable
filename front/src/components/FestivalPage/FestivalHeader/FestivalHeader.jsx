import Image from "next/image";
import s from "./FestivalHeader.module.scss";

export default function FestivalHeader() {
  return (
    <section className={`${s.festival} festival-header`} aria-labelledby="festival-title">
      <div className={`${s.festival__container} festival-header__container`}>
        <h1 id="festival-title" className={s.festival__title}> Zeyzey Presents : Sister Sledge </h1>
        <h2 className={s.festival__subtitle}>Présenté par <span>Zeyzey Miami</span> </h2>
        <div className={s.festival__info} aria-label="Informations sur l'événement">
          <div className={s.festival__infoItem}>
            <Image src="/icones/calendar.svg" alt="Calendrier" width={20} height={30} aria-hidden="true"/>
            <p> Date : Sam 14 Déc 2024 – Dim 15 Déc 2024</p>
          </div>

          <div className={s.festival__infoItem}>
            <Image src="/icones/house.svg" alt="Lieu" width={20} height={30} aria-hidden="true"/>
            <p> Lieu : Club Haussmann</p>
          </div>

          <div className={s.festival__infoItem}>
            <Image src="/icones/info.svg" alt="Accessibilité" width={20} height={30} aria-hidden="true"/>
            <div className={s.festival__infoBadges}>
              <span className={s.festival__infoBadge} >Accessible en fauteuil</span>
              <span className={s.festival__infoBadge} >Aire de pique-nique</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
