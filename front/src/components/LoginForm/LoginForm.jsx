'use client';
import { useState } from "react";
import styles from "./LoginForm.module.css";
import formStyles from "../../styles/Form.module.css";

export default function LoginForm() {
    return (
        <div className={`${styles.container} login-form`}>
            <h2>Connexion à mon compte</h2>
            <form action="" className={formStyles.form} >
                <div className={formStyles.inputContainer}>
                    <input type="text" className={formStyles.input} id="email" placeholder=" " required />
                    <label htmlFor="email" className={formStyles.label}>E-mail</label>
                </div>
                <div className={formStyles.inputContainer}>
                    <input type="password" className={formStyles.input} id="password" placeholder=" " required />
                    <label htmlFor="password" className={formStyles.label}>Mot de passe</label>
                </div>
                <button>Se connecter</button>
            </form>
        </div>
    );
}