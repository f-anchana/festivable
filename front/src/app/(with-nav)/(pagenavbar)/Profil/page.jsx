import Head from 'next/head';
import Image from 'next/image';
import ProfilePage from '@/components/ProfilePage/ProfilePage'


export default function ProfilPage() {
   return (
    <>
      <Head>
        <title> Profil | Festivable</title>
        <meta
          name="profil"
          content="profil de l'utilisateur "
        />
      </Head>

      <main>
        <ProfilePage/>
      </main>
    </>
  );
}
