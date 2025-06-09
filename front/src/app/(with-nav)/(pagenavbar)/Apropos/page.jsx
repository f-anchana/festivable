import Head from 'next/head';
import styles from '@/app/(with-nav)/Homepage.module.css';
import PresentationFestivable from '@/components/Apropos/PresentationFestivable/PresentationFestivable';
import MissionFestivable from '@/components/Apropos/Mission/MissionFestivable';
import EquipeFestivable from '@/components/Apropos/Equipe/EquipeFestivable'

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
        <MissionFestivable />
        <EquipeFestivable/>
      </main>
    </>
  );
}
