import Head from 'next/head';
// import styles from './Referenciel.module.scss';
import styles from '@/app/(with-nav)/Homepage.module.css';
import s from './Referenciel.module.scss';

import Card from '@/components/Card/Card';

export default function Referenciel() {
    return (
        <>
            <Head>
                <title> Profil | Festivable</title>
                <meta
                    name="profil"
                    content="profil de l'utilisateur "
                />
            </Head>

            <main className={`${styles.container} ${s.container}`}>
                <h1><strong>Festiv’Able & OpenFEST :</strong>
                    <strong>Des projets complémentaires pour des festivals inclusifs !</strong></h1>
                <div className={s.paragraphGroup}>
                    <p>L’accessibilité est un enjeu majeur pour garantir que tous les publics puissent profiter pleinement des festivals, quels que soient leurs besoins spécifiques. Pour cela, il est essentiel que les organisateurs disposent d’outils clairs et adaptés afin de comprendre et appliquer les règles d’accessibilité.</p>
                    <p>C’est précisément l’objectif du projet OpenFEST, développé par nos camarades. OpenFEST propose un référentiel complet et pédagogique des bonnes pratiques à suivre pour rendre un festival accessible. À l’image d’OpQuast dans le domaine du web, OpenFEST vise à guider les organisateurs à travers les normes et obligations pour créer des événements accueillants et conformes aux exigences d’accessibilité.</p>
                </div>
                <h2 className={s.poppinsFont}>Notre projet et OpenFEST sont complémentaires :</h2>
                <div className={s.cardContainer}>
                    <Card
                        title="Openfest"
                        text="Aide les organisateurs à comprendre et appliquer les règles d’accessibilité de manière précise et progressive."
                        color="orange"
                    />
                    <Card
                        title="FESTIV'ABLE"
                        text="Se concentre sur la mise en relation des festivals avec des outils et services, notamment par la visibilité offerte via des pictogrammes accessibles et une cartographie des événements référencés partout en France respectant des normes d’accessibilité."
                        color="blue"
                    />
                </div>

                <div className={s.referencielSection}>
                    <img
                        src="/images/illustration-handshake.png"
                        alt="Deux personnes qui se serrent la main"
                        className={s.illustration}
                    />
                    <div className={s.sectionContent}>
                        <p>
                            En combinant ces deux approches, nous contribuons ensemble à rendre la culture plus accessible à tous.
                            Nous encourageons donc les organisateurs à consulter OpenFEST pour se former aux bonnes pratiques,
                            puis à utiliser notre plateforme pour valoriser leurs actions et accompagner les publics en situation de handicap.
                        </p>
                        <a href="https://www.openfest.fr" target="_blank" rel="noopener noreferrer" className={s.button}>
                            Découvrir
                        </a>
                    </div>
                </div>

            </main>
        </>
    );
}
