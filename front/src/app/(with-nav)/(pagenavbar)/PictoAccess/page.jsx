import Head from 'next/head';
import Image from 'next/image';
import PictoAccessPage from '@/components/PictoAcessPage/PictoAccessPage';

export default function PictoAccess() {
   return (
    <>
      <Head>
        <title> PictoAccess | Festivable</title>
        <meta
          name="description"
          content="presentation de Picto Access "
        />
      </Head>

      <main>
        <PictoAccessPage/>
      </main>
    </>
  );
}
