'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ProfilePage.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Récupération des infos utilisateur au chargement
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/user-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error('Erreur lors de la récupération du profil');
          setUser(null);
        }
      } catch (error) {
        console.error('Erreur fetch user profile', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Gestion du changement de photo de profil
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const formData = new FormData();
formData.append('image', file);

    try {
      const res = await fetch(`${API_URL}/user-avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la mise à jour de la photo');
      }

      const updatedUser = await res.json();
      setUser(updatedUser);
    } catch (error) {
      console.error('Erreur upload photo :', error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!user) return <p>Utilisateur non connecté</p>;

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <Image
                src={`${API_URL}/${user.profile_picture}`}
                alt="Photo de profil"
                width={100}
                height={100}
                className={styles.avatar}
              />
              <button
                className={styles.editBtn}
                aria-label="Modifier la photo de profil"
                onClick={() => fileInputRef.current.click()}
                type="button"
              >
                <Image src="/icones/edit-icon.svg" alt="Modifier" width={20} height={20} />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className={styles.infoSection}>
            <h2 className={styles.pseudo}>{user.pseudo}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.number}</p>
          </div>
        </header>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label htmlFor="lastName">Nom</label>
              <input id="lastName" type="text" value={user.lastname || ''} required readOnly />
              {/* Tu peux enlever readOnly pour rendre éditable */}
            </div>
            <div className={styles.field}>
              <label htmlFor="firstName">Prénom</label>
              <input id="firstName" type="text" value={user.firstname || ''} required readOnly />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={user.email || ''} required readOnly />
            </div>
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>
              Enregistrer
            </button>
            <button type="button" className={styles.passwordBtn}>
              Modifier le mot de passe
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
