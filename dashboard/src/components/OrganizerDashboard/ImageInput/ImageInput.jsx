'use client';

import { useState } from 'react';
import formStyles from '@/app/(OrganizerDashboard)/gallery/gallery.module.scss';

export default function ImageInput({ id, label, onChange }) {
  const [fileName, setFileName] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('images', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Erreur lors de l’envoi');

      const data = await res.json();
      const newImagePath = data.paths?.[0];

      if (!newImagePath) throw new Error('Chemin d’image manquant');

      onChange(newImagePath); // renvoie le chemin correct vers la BDD
    } catch (err) {
      console.error('Erreur upload image :', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={formStyles.inputContainer}>
      <label htmlFor={id}>{label}</label>

      <div className={formStyles.imageInputWrapper}>
        <label htmlFor={id} className={formStyles.imageInputButton}>
          {isUploading ? '⏳ Téléchargement...' : '📤 Joindre une image jpeg ou png'}
        </label>
        <input
          id={id}
          type="file"
          accept="image/png, image/jpeg"
          className={formStyles.hiddenInput}
          onChange={handleChange}
        />
        <span className={formStyles.imageInputInfo}>
          {fileName ? `✅ ${fileName}` : 'Aucun fichier'}
        </span>
      </div>
    </div>
  );
}
