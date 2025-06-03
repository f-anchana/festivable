import Head from 'next/head';
import styles from '@/app/(with-nav)/Homepage.module.css';

export default function PictoAccess() {
  return (
    <>
      <Head>
        <title>Picto Access & Festivable - Accessibilité dans les festivals</title>
        <meta
          name="description"
          content="Découvrez Picto Access, son rôle dans l'accessibilité des festivals via Festivable et comment les organisateurs peuvent certifier leurs événements."
        />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.title}>Picto Access : Accessibilité dans les festivals</h1>

        <section className={styles.section}>
          <div className={styles.text}>
            <h2>Qu’est-ce que PictoAccess ?</h2>
            <p>
              PictoAccess est un système de pictogrammes conçu pour faciliter l’accès à l’information et la signalétique dans les festivals et événements culturels.
              Il permet d’indiquer clairement les services et espaces accessibles aux personnes en situation de handicap.
            </p>
            <p>
              En savoir plus sur le site officiel :{' '}
              <a href="https://www.pictoaccess.fr" target="_blank" rel="noopener noreferrer" className={styles.link}>
                www.pictoaccess.com
              </a>
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img
              src="/images/pictoaccess.jpg"
              alt="Illustration PictoAccess"
              className={styles.image}
            />
          </div>
        </section>

        <section className={`${styles.section} ${styles.reverse}`}>
          <div className={styles.imageWrapper}>
            <img
              src="/images/festivable_intervention.jpg"
              alt="Festivable intégration PictoAccess"
              className={styles.image}
            />
          </div>
          <div className={styles.text}>
            <h2>Comment Festivable intervient ?</h2>
            <p>
              Festivable aide les organisateurs de festivals à intégrer PictoAccess dans leurs événements.
              Cela permet d’informer les visiteurs avec des pictogrammes clairs et d’organiser des parcours accessibles.
            </p>
            <p>
              Ainsi, les personnes en situation de handicap bénéficient d’une expérience plus fluide et inclusive.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.text}>
            <h2>Certification PictoAccess</h2>
            <p>
              Si l’organisateur le souhaite, le festival peut être certifié PictoAccess, garantissant que l’événement répond aux normes d’accessibilité.
            </p>
            <p>
              Cette certification assure une meilleure inclusion et montre l’engagement du festival envers l’accessibilité universelle.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img
              src="/images/certification.jpg"
              alt="Certification PictoAccess"
              className={styles.image}
            />
          </div>
        </section>
      </main>
    </>
  );
}
