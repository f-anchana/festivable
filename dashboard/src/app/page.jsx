'use client';
import styles from "@/styles/Login.module.scss";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const response = await fetch(`${API_URL}/login-dashboard`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "/myfestival";
            } else {
                alert("Identifiants incorrects");
            }
        } catch (err) {
            alert("Erreur de connexion");
        }
    };

    return (
        <div className={`${styles.container} login-form`}>
            <h2>Connexion à mon compte</h2>
            <form onSubmit={handleSubmit} className={styles.form} >
                <div className={styles.inputContainer}>
                    <input type="text" className={styles.input} id="email" placeholder=" " name="email" required />
                    <label htmlFor="email" className={styles.label}>E-mail</label>
                </div>
                <div className={styles.inputContainer}>
                    <input type={"password"} className={styles.input} id="password" placeholder=" " name="password" required />
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