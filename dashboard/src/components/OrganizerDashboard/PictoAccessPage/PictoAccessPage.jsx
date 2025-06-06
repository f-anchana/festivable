'use client';
import React from "react";
import styles from "../../../app/(OrganizerDashboard)/pictoAccess/PictoAccess.module.scss";

const PictoAccessPage = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Accédez à une expertise certifiée avec Picto Access
      </h2>

      <p className={styles.text}>
        Vous souhaitez aller plus loin dans l’évaluation de l’accessibilité de votre événement ? Picto Access est
        une solution reconnue qui accompagne les acteurs culturels avec des audits détaillés, des vérifications
        terrain et une base de données certifiée. Leur expertise apporte un regard professionnel, complémentaire
        à notre auto-déclaration.
      </p>

      <p className={styles.text}>Recourir à Picto Access vous permet de :</p>

      <ul className={styles.list}>
        <li>Valoriser votre engagement par une certification officielle</li>
        <li>Améliorer la visibilité de votre festival auprès du public en situation de handicap</li>
        <li>Identifier concrètement les axes d’amélioration d’accessibilité</li>
        <li>Bénéficier d’un accompagnement reconnu par les institutions culturelles</li>
      </ul>

      <p className={styles.text}>
        Une fois le certificat obtenu, il vous suffit de l’envoyer à l’adresse suivante :
        <strong> contact@festivable.fr</strong>.
        <br />
        Notre équipe d’administration vérifiera l’authenticité du document, puis vous attribuera un badge{" "}
        <strong className={styles.highlight}>“Certifié Picto Access”</strong> visible sur votre page festival.
      </p>

      <div className={styles.footer}>
<a
  href="https://www.pictoaccess.fr/"
  className={styles.button}
  target="_blank"
  rel="noopener noreferrer"
>
  Découvrir Picto Access
</a>
        <div className={styles.logo}>
          <img src="/logo/pictoaccesspage.png" alt="Logo Picto Access" />
        </div>
      </div>
    </section>
  );
};

export default PictoAccessPage;
