'use client';

import { useRef, useState } from 'react';
import styles from './GalleryPreview.module.scss';
import Image from 'next/image';

export default function GalleryPreview({ images = [], onImagesChange }) {
  const totalSlots = 17;
  const [currentIndex, setCurrentIndex] = useState(null);
  const fileInputRef = useRef(null);

  const paddedImages = [...images];
  while (paddedImages.length < totalSlots) {
    paddedImages.push(null);
  }

  const mainImage = paddedImages[0];
  const sideImages = paddedImages.slice(1, 10);
  const galleryImages = paddedImages.slice(10);

  const handlePlaceholderClick = (index) => {
    setCurrentIndex(index);
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || currentIndex === null) return;

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

      if (!res.ok) throw new Error('Erreur lors de l’envoi de l’image');

      // Ajout visuel immédiat (prévisualisation)
      const imageUrl = URL.createObjectURL(file);
      const updatedImages = [...paddedImages];
      updatedImages[currentIndex] = imageUrl;
      onImagesChange(updatedImages.filter(Boolean));
    } catch (err) {
      console.error('Erreur lors de l’envoi :', err);
    }

    setCurrentIndex(null);
  };

  const handleDeleteImage = async (index) => {
    const imgToDelete = paddedImages[index];
    if (!imgToDelete) return;
  
    const token = localStorage.getItem('token');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
    try {
      // Extraire le nom du fichier (ex: "uploads/image123.jpg" → "image123.jpg")
      const imageName = imgToDelete.split('/').pop().replace(/\\/g, '');
  
      const res = await fetch(`${apiUrl}/gallery/${imageName}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error('Erreur suppression');
  
      const updatedImages = [...paddedImages];
      updatedImages[index] = null;
      onImagesChange(updatedImages.filter(Boolean));
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    }
  };
  

  // 🔧 Nettoie et construit une URL utilisable par <Image />
  const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('blob:')) return img;
    if (img.startsWith('http')) return img;
    return `${process.env.NEXT_PUBLIC_API_URL}/${img.replace(/\\/g, '/')}`;
  };

  const renderImageBlock = (img, index) => {
    return img ? (
      <div key={`img-${index}`} className={styles.gallery__imageWrapper}>
        <Image
          src={getImageUrl(img)}
          alt={`Image ${index + 1}`}
          width={150}
          height={100}
          className={styles.gallery__thumb}
        />
        <button
          className={styles.gallery__deleteButton}
          onClick={() => handleDeleteImage(index)}
          aria-label="Supprimer l'image"
        >
          🗑
        </button>
      </div>
    ) : (
      <div
        key={`placeholder-${index}`}
        className={
          index === 0
            ? styles.gallery__placeholderLarge
            : styles.gallery__placeholder
        }
        onClick={() => handlePlaceholderClick(index)}
      >
        +
      </div>
    );
  };

  return (
    <div className={styles.gallery}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <div className={styles.gallery__main}>
        {renderImageBlock(mainImage, 0)}
      </div>

      <div className={styles.gallery__sideGrid}>
        {sideImages.map((img, i) => renderImageBlock(img, i + 1))}
      </div>

      <div className={styles.gallery__galleryGrid}>
        {galleryImages.map((img, i) => renderImageBlock(img, i + 10))}
      </div>
    </div>
  );
}
