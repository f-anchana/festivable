'use client';
import { useState } from "react";
import styles from "./LoginForm.module.css";
import formStyles from "@/styles/Form.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch(`${API_URL}/login-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔐 Stocker les infos utiles
        localStorage.setItem("token", data.token);
        localStorage.setItem("pseudo", data.pseudo);
        localStorage.setItem("avatar", data.profile_picture);
        window.location.href = "/";
      } else {
        alert("Identifiants incorrects");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className={`${styles.container} login-form`}>
      <h2>Connexion à mon compte</h2>
      <form onSubmit={handleSubmit} className={formStyles.form}>
        <div className={formStyles.inputContainer}>
          <input type="text" id="email" className={formStyles.input} placeholder=" " required />
          <label htmlFor="email" className={formStyles.label}>E-mail</label>
        </div>
        <div className={formStyles.inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={formStyles.input}
            placeholder=" "
            required
          />
          <label htmlFor="password" className={formStyles.label}>Mot de passe</label>
          <button type="button" className={formStyles.showpassword} onClick={togglePassword}>
            <img src={showPassword ? "/icones/closed-eye.svg" : "/icones/open-eye.svg"} alt="" />
          </button>
        </div>
        <button>Se connecter</button>
      </form>
    </div>
  );
}
