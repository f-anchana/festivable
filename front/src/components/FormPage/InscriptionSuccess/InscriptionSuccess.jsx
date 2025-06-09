import styles from './InscriptionSuccess.module.scss';

export default function InscriptionSuccess({
    role = "",
    pseudo
}
) {

    return (
        <div className={`${styles.container} ${role === "organizer" ? styles.organizer : styles.user}`}>
            <div className={styles.message}>
                <div className={styles.inline}>
                                    <h1>
                        {role === "organizer"
                            ? "Merci pour votre inscription."
                            : (
                                <><span>Félicitations</span> <span>{pseudo} !</span></>
                            ) }
                </h1>
                </div>


                <p>
                    {role === "organizer" ? "Nous avons bien reçu votre demande. Un e-mail contenant un lien de validation vient de vous être envoyé. Vous pouvez créer votre festival depuis votre tableau de bord. Pour toute information supplémentaire, n’hésitez pas à nous contacter sur contact@festivable.fr." : "Votre compte a été crée avec succès. N’oubliez pas que vous pouvez modifier vos données dans votre espace personnel à tout moment !"}
                </p>
                <a href="/">Retourner à l'accueil</a>
            </div>
        </div>
    )
}