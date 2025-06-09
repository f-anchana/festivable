import styles from '@/components/PictoAcessPage/PictoAccessPage.module.scss';

import Head from 'next/head';
import Image from 'next/image';

export default function PictoAccessPage() {
  return (
    <>
      <Head>
        <title>Picto Access & Festivable - Accessibilité dans les festivals</title>
        <meta
          name="description"
          content="Découvrez Picto Access, son rôle dans l'accessibilité des festivals via Festivable et comment les organisateurs peuvent certifier leurs événements."
        />
      </Head>

  <div className={styles.page}>
  <h1 className={`${styles.aproposTitle} ${styles.highlight}`}>
    Picto Access :
  </h1>

  <h1 className={styles.aproposTitle}>
    un partenaire <span className={styles.orange}>clé</span> pour l’accessibilité
  </h1>
</div>


        <div className={styles.container}>
          <div className={styles.fixedImage}>
            <Image
              src="/images/PictoAcessPage.svg"
              alt="Picto Access"
               width={500}
      height={500}
            />
          </div>

          <div className={styles.scrollContent}>
            <div className={styles.content}>
              <section>
                <h2>Qu’est-ce que Picto Access ?</h2>
                <p>
                  Saviez-vous que certaines personnes en situation de handicap renoncent à participer à des événements faute d’informations claires ou d’aménagements adaptés ? <br /><br />
                  Par exemple, une personne malentendante peut ne pas accéder aux informations essentielles diffusées sur place, ou une personne à mobilité réduite peut rencontrer des obstacles physiques importants.
                </p>
                <p>
                  Pour répondre à ces défis, des organismes spécialisés comme PictoAccess développent des solutions concrètes visant à rendre les événements culturels véritablement accessibles à tous.
                </p>
                <p>
                  Grâce à leurs pictogrammes certifiés et à leurs conseils, ces derniers accompagnent les organisateurs dans la mise en place de dispositifs accessibles.
                </p>
                <p>
                  Dans le cadre de notre projet, deux membres de notre équipe ont eu l’occasion de participer à des séminaires et d’échanger directement avec les équipes. Cette expérience nous a permis de nous inspirer de leur démarche pour développer notre plateforme.
                </p>
              </section>
              <br />

              <section>
                <h2>Notre offre gratuite, en complément de l’expertise Picto Access</h2>
                <p>
                  Notre site propose une première étape gratuite qui permet aux organisateurs de mieux comprendre et référencer l’accessibilité de leurs festivals à travers ces pictogrammes. Cependant, pour un diagnostic complet et un accompagnement professionnel, nous recommandons vivement de faire appel à PictoAccess.
                </p>
                <p>
                  Notre collaboration avec eux garantit une approche cohérente et complémentaire : nous offrons un premier outil accessible, tandis qu’eux proposent un service complet et expert. Enfin, notre plateforme permet d’intégrer directement les pictogrammes officiels de PictoAccess, afin d’assurer une communication claire et adaptée à tous.
                </p>
                <p>
                  Nous invitons donc les organisateurs à découvrir et à s’appuyer sur PictoAccess pour aller plus loin dans leur démarche d’accessibilité.
                </p>
              </section>

              <button className={styles.button}>Accéder à la page Picto Access →</button>
            </div>
          </div>
        </div>
      
    </>
  );
}
