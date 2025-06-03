import Head from 'next/head';
import styles from '@/app/(with-nav)/Homepage.module.css';
import FestivalVolunteer from '@/components/FestivalPage/FestivalVolunteer/FestivalVolunteer';

export default function Apropos() {
  return (
    <>
      <Head>
        <title> À propos | Festivable</title>
        <meta
          name="description"
          content="presentation de festivable "
        />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.title}>à PROPOS DE FESTIV’ABLE</h1>

        <p className={styles.intro}>
          Vous avez envie de participer à un projet humain et engagé ?  
          Devenez bénévole pour améliorer l'accessibilité dans les festivals et vivre une expérience inoubliable !
        </p>

        <section className={styles.offres}>
          <h2 className={styles.subtitle}>Nos offres de bénévolat</h2>
          <FestivalVolunteer />
        </section>
      </main>
    </>
  );
}
