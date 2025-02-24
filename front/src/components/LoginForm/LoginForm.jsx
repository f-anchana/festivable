import styles from "./LoginForm.module.css";

export default function LoginForm() {
    return (
        <div className={`${styles.container} login-form`}>
            <h2>Connexion à mon compte</h2>
            <form action="">
                <input type="text" placeholder="E-mail" />
                <input type="password" placeholder="Mot de passe" />
                <button>Se connecter</button>
            </form>
        </div>
    );
}