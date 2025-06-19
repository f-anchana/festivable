'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ProfilePage.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/user-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setPreview(data.profile_picture ? `${API_URL}/${data.profile_picture}` : null);
        setFormData({
          lastname: data.lastname || '',
          firstname: data.firstname || '',
          email: data.email || '',
          phone: data.phone || '',
        });
      }
    } catch (err) {
      console.error('Erreur fetch user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Non connecté');

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Erreur mise à jour');
      await fetchUserProfile();
      alert('Profil mis à jour');
    } catch (err) {
      alert('Erreur lors de la mise à jour');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Non connecté');
      setUploading(false);
      return;
    }

    setPreview(URL.createObjectURL(file));

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const res = await fetch(`${API_URL}/user-avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataUpload,
      });
      if (!res.ok) throw new Error('Erreur upload');
      const data = await res.json();
      setUser((prev) => ({ ...prev, profile_picture: data.profile_picture }));
      alert('Photo de profil mise à jour');
    } catch (err) {
      alert('Erreur upload photo');
      console.error(err);
      setPreview(user?.profile_picture ? `${API_URL}/${user.profile_picture}` : null);
    } finally {
      setUploading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert('Veuillez remplir tous les champs');
    }
    if (newPassword !== confirmPassword) {
      return alert('Les mots de passe ne correspondent pas');
    }

    const token = localStorage.getItem('token');
    if (!token) return alert('Non connecté');

    try {
      const res = await fetch(`${API_URL}/user-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Erreur de mise à jour');
      }

      alert('Mot de passe mis à jour');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className={styles.loaderOverlay}>
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p>Chargement...</p>
        </div>
      </div>
    );

  if (!user) return <p>Utilisateur non connecté</p>;

  return (
    <main className={styles.main}>
      <section className={styles.wrapper}>
        <header className={styles.header}>
          {showPasswordForm ? (
            <button onClick={() => setShowPasswordForm(false)} className={styles.backBtn}>
              ← Retour
            </button>
          ) : (
            <>
              <div className={styles.avatarSection}>
                <div className={styles.avatarWrapper}>
                  {uploading && <div className={styles.uploadingOverlay}>Téléchargement...</div>}
                  <Image
                    src={preview || '/default-avatar.png'}
                    alt="Photo de profil"
                    width={100}
                    height={100}
                    className={styles.avatar}
                    priority
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
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className={styles.infoSection}>
                <h2 className={styles.pseudo}>{user.pseudo}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </div>
            </>
          )}
        </header>

        {showPasswordForm ? (
          <form className={styles.form} onSubmit={handlePasswordChange}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="currentPassword">Mot de passe actuel</label>
                <input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))
                  }
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))
                  }
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.saveBtn}>
                Enregistrer le nouveau mot de passe
              </button>
            </div>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="lastname">Nom</label>
                <input id="lastname" type="text" value={formData.lastname} onChange={handleChange} />
              </div>
              <div className={styles.field}>
                <label htmlFor="firstname">Prénom</label>
                <input
                  id="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="phone">Numéro de téléphone</label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.buttons}>
              <button type="submit" className={styles.saveBtn} disabled={loading}>
                Enregistrer
              </button>
              <button
                type="button"
                className={styles.passwordBtn}
                onClick={() => setShowPasswordForm(true)}
              >
                Modifier le mot de passe
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
