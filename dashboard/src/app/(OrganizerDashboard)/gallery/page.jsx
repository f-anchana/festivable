'use client';

import { useEffect, useState } from 'react';
import styles from './gallery.module.scss';

import ImageInput from '@/components/OrganizerDashboard/ImageInput/ImageInput';
import GalleryPreview from '@/components/OrganizerDashboard/GalleryPreview/GalleryPreview';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const totalSlots = 17;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔁 Charger les images au montage
  useEffect(() => {
    const fetchGallery = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('Aucun token trouvé, utilisateur non connecté');
        return;
      }

      try {
        const res = await fetch(`${API_URL}/my-gallery`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Erreur de chargement : ${res.status} - ${text}`);
        }

        const data = await res.json();
        if (!data.images) {
          console.warn('Aucune image trouvée dans la réponse');
        }
        setImages(data.images || []);
      } catch (err) {
        console.error('Erreur lors du chargement de la galerie :', err.message);
      }
    };

    fetchGallery();
  }, [API_URL]);

// 📤 Upload depuis ImageInput
const handleImageUpload = async (imagePath) => {
  if (!imagePath) return;

  if (images.length >= totalSlots) {
    console.warn('Nombre maximal d’images atteint');
    return;
  }

  // Ajoute l’image envoyée depuis le backend
  setImages((prev) => [...prev, imagePath]);
};


  return (
    <div className={styles.container}>
      <h2>Mes photographies</h2>
      <p>
        Toutes les images ajoutées ici seront automatiquement affichées sur le
        site public du festival. N’hésitez pas à mettre en valeur les différents
        aspects de votre événement.
      </p>

      <ImageInput
        id="image"
        label="Ajouter une image :"
        onChange={handleImageUpload}
      />

      <GalleryPreview images={images} onImagesChange={setImages} />
    </div>
  );
}
