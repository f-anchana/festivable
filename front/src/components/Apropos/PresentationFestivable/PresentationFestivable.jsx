
import React from "react";
import styles from "./PresentationFestivable.module.scss"


export default function PresentationFestivable() {
  return (
    <main className={styles.presentationContainer}>
      {/* À propos */}
      <section className={styles.aproposSection}>
        <div className={styles.aproposText}>
          <h1 className={styles.aproposTitle}>À PROPOS DE FESTIV’ABLE</h1>
          <h2 className={styles.subtitle}>Qui sommes-nous ?</h2>
          <p>
            Festiv’Able est une initiative née de la volonté de rendre les festivals accessibles à toutes et à tous, sans exception.
            Nous croyons qu’un événement culturel ne doit exclure personne : que vous soyez une personne en situation de handicap,
            parent avec une poussette, personne âgée, blessée temporairement, ou simplement en quête de confort,
            vous avez le droit de vivre l’expérience du festival pleinement.
          </p>
          <p>
            C’est avec cette vision inclusive que notre équipe d’étudiant·e·s a conçu Festiv’Able :
            une plateforme pensée pour accompagner les organisateurs dans la mise en place d’événements réellement accessibles,
            tout en informant les festivaliers des dispositifs prévus sur chaque site.
          </p>
        </div>
        <img
          src="/decor/apropos-1.svg"
          alt=""
          className={styles.aproposIllustration}
        />
      </section>

      {/* Collaboration */}
      <section className={styles.collabSection}>
        <img
          src="/decor/apropos-2.svg"
          alt=""
          className={styles.collabImage}
        />
        <div className={styles.collabText}>
          <h2 className={styles.subtitle}>Une collaboration engagée</h2>
          <p>
            Nous sommes fiers d’avoir démarré ce projet en partenariat avec APF France handicap,
            une association de référence dans le domaine du handicap en France.
            Leur soutien et leurs conseils nous ont permis de mieux comprendre les enjeux concrets du terrain
            et d’imaginer des outils utiles, simples et efficaces pour tous.
          </p>
          <button className={styles.collabButton}>Découvrir APF France handicap</button>
        </div>
        <img
          src="/decor/apfbadge.svg"
          alt=""
          className={styles.collabBadge}
        />
      </section>
    </main>
  );
}
