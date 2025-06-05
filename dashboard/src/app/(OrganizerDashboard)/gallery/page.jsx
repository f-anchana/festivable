'use client';

import { useState } from 'react';
import styles from './gallery.module.scss';

import ImageInput from '@/components/OrganizerDashboard/ImageInput/ImageInput';
import GalleryPreview from '@/components/OrganizerDashboard/GalleryPreview/GalleryPreview';

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Créé un lien temporaire
      setImages((prevImages) => [...prevImages, imageUrl]);
    }
  };

  return (
    <div className={styles.container}>
        <h2>Mes photographies</h2>
        <p>Toutes les images ajoutées ici seront automatiquement affichées sur le site public du festival.N’hésitez pas à mettre en valeur les différents aspects de votre événement, notamment les dispositifs accessibles (signalétique, rampes, espaces réservés, etc.) pour montrer que votre festival est pensé pour tous les publics.</p>
      <ImageInput id="image" label="Ajouter une image :" onChange={handleImageUpload} />
      <GalleryPreview images={images} />
    </div>
  );
}
