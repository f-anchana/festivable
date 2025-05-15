import s from "./FestivalDescription.module.scss";
import Image from "next/image";

export default function FestivalDescription() {
  return (
    <section
      className="festival-description"
      aria-labelledby="festival-description-title"
    >
      <div className="festival-description__container">
        <div className={`${s.festivaldescription__header} festival-description__header`} >
          <h1 id="festival-description-title" className={`${s.festivaldescription__title} festival-description__title`}>
            Description
          </h1>
          <p
            className={`${s.festivaldescription__text} festival-description__text`}>
            Le Festival des Lumières de la Forêt Enchantée est un événement
            unique qui se déroule chaque année dans la magnifique Forêt
            Enchantée. Pendant trois jours, les visiteurs peuvent explorer un
            parcours lumineux au cœur de la forêt, où des installations
            artistiques et des projections de lumières créent une atmosphère
            magique et féérique.
          </p>
        </div>
        <div className={`${s.festivaldescription__content} festival-description__content`}>
            <h2> À propos du festival : </h2>
            <div className={`${s.festivaldescription__item} festival-description__item`}>
                <Image src="/icones/calendar.svg" alt="Calendrier" width={40} height={60} aria-hidden="true"/>
                <div className={`${s.festivaldescription__itemtext} festival-description__itemtext`}>
                    <h3>Dates</h3>
                    <p>Sat 14 Dec 2024 - Sun 15 Dec 2024 </p>
                </div>
            </div>
            <div className={`${s.festivaldescription__item} festival-description__item`}>
                <Image src="/icones/pin.svg" alt="pin" width={40} height={60} aria-hidden="true"/>
                <div className={`${s.festivaldescription__itemtext} festival-description__itemtext`}>
                    <h3>Lieux</h3>
                    <p>Club Haussmann </p>
                </div>
            </div>
            <div className={`${s.festivaldescription__item} festival-description__item`}>
                <Image src="/icones/clock.svg" alt="Horloge" width={40} height={60} aria-hidden="true"/>
                <div className={`${s.festivaldescription__itemtext} festival-description__itemtext`}>
                    <h3>2 jours</h3>
                    <p>Ouvert de 12h à 01h30 durant toute la période des festivités. </p>
                </div>
            </div>
            <div className={`${s.festivaldescription__item} festival-description__item`}>
                <Image src="/icones/language.svg" alt="language" width={40} height={60} aria-hidden="true"/>
                <div className={`${s.festivaldescription__itemtext} festival-description__itemtext`}>
                    <h3>Langues</h3>
                    <p>English, French, German, Spanish , Indi </p>
                </div>
            </div>
            <div className={`${s.festivaldescription__item} festival-description__item`}>
                <Image src="/icones/info.svg" alt="Accessibilité" width={40} height={60} aria-hidden="true"/>
                <div className={`${s.festivaldescription__itemtext} festival-description__itemtext`}>
                    <h3>Gratification d’accessibilité</h3>
                    <div className={s.festivaldescription__itemBadges}>
                        <span className={s.festivaldescription__itemBadge} >Accessible en fauteuil</span>
                        <span className={s.festivaldescription__itemBadge} >Aire de pique-nique</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
