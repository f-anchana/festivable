import Head from 'next/head';
import styles from '@/app/(with-nav)/Homepage.module.css';
import PresentationFestivable from '@/components/Apropos/PresentationFestivable/PresentationFestivable';



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
        <PresentationFestivable />
      </main>
    </>
  );
}
