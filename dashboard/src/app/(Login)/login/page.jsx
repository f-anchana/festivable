import styles from "./Login.module.scss";
import Image from "next/image";


export default function Login() {
    return (
        <div className={`${styles.container} login-form`}>
            <h2>Connexion à mon compte</h2>
            <form action="" className={styles.form} >
                <div className={styles.inputContainer}>
                    <input type="text" className={styles.input} id="email" placeholder=" " required />
                    <label htmlFor="email" className={styles.label}>E-mail</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type={"password"} className={styles.input} id="password" placeholder=" " required />
                    <label htmlFor="password" className={styles.label}>Mot de passe</label>
                    {/* <button type="button" aria-label="Afficher ou masquer le mot de passe" className={styles.showpassword} onClick={togglePassword}>
                        <img src={showPassword ? "/icones/closed-eye.svg" : "/icones/open-eye.svg"} alt="" />
                    </button> */}
                </div>
                <button>Se connecter</button>
            </form>
            <div className={styles.mentions}>
                <Image
                    src="/logo/Logo_Festivable.svg"
                    alt="Logo Festivable"
                    width={40}
                    height={20}
                    priority
                />
                <p>©2025 Festivable</p>
                <a href="">Politique de confidentialité</a>
            </div>
        </div>
    );
}