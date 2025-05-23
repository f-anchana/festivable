'use client';

import { useState } from 'react';
import formStyles from '@/app/(OrganizerDashboard)/gallery/gallery.module.scss';

export default function ImageInput({ id, label, onChange }) {
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(e);
    }
  };

  return (
    <div className={formStyles.inputContainer}>
      <label htmlFor={id}>{label}</label>

      <div className={formStyles.imageInputWrapper}>
        <label htmlFor={id} className={formStyles.imageInputButton}>
          📤 Joindre une image jpeg ou png
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
