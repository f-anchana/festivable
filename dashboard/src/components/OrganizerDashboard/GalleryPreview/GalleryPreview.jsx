'use client';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useEffect, useRef, useState } from 'react';
import styles from './GalleryPreview.module.scss';

const getImageUrl = (img) => {
  if (!img) return '';
  if (img.startsWith('blob:') || img.startsWith('http')) return img;
  return `${process.env.NEXT_PUBLIC_API_URL}/${img.replace(/\\/g, '/')}`;
};

function SortableImage({ id, src, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={styles.gallery__imageWrapper}
    >
      {/* Pas de {...listeners} ici pour éviter conflit avec le bouton */}
      <img
        src={getImageUrl(src)}
        alt="Image"
        width={150}
        height={100}
        className={styles.gallery__thumb}
        {...listeners} // sur img uniquement
      />
      <button
        className={styles.gallery__deleteButton}
        onClick={(e) => {
          e.stopPropagation(); // important !
          e.preventDefault();  // sécurité supplémentaire
          onDelete(src);
        }}
        aria-label="Supprimer l'image"
      >
        🗑
      </button>
    </div>
  );
}


export default function GalleryPreview({ images = [], onImagesChange }) {
  const totalSlots = 17;
  const [items, setItems] = useState(images);
  const [currentIndex, setCurrentIndex] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setItems(images);
  }, [images]);

  const sensors = useSensors(useSensor(PointerSensor));
  const paddedItems = [...items];
  while (paddedItems.length < totalSlots) paddedItems.push(null);

  const mainImage = paddedItems[0];
  const sideImages = paddedItems.slice(1, 10);
  const galleryImages = paddedItems.slice(10);

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

      if (!res.ok) throw new Error('Erreur lors de l’envoi');

      const data = await res.json();
      const newImagePath = data.paths?.[0] || data.path;
      if (!newImagePath) throw new Error('Chemin d’image manquant');

      const updated = [...paddedItems];
      updated[currentIndex] = newImagePath;

      const newList = updated.filter(Boolean);
      setItems(newList);
      onImagesChange(newList);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/reorder`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ images: newList }),
      });
    } catch (err) {
      console.error(err);
    }

    setCurrentIndex(null);
  };

  const handleDeleteImage = async (imgPath) => {
    if (!imgPath) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const imageName = imgPath.split('/').pop();

      const res = await fetch(`${baseUrl}/gallery/${imageName}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) {
        console.error('Erreur suppression :', await res.text());
        throw new Error('Échec suppression');
      }

      const updated = items.filter((img) => img !== imgPath);
      setItems(updated);
      onImagesChange(updated);

      await fetch(`${baseUrl}/gallery/reorder`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ images: updated }),
      });
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((img) => img === active.id);
    const newIndex = items.findIndex((img) => img === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);
    setItems(reordered);
    onImagesChange(reordered);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/reorder`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ images: reordered }),
    });
  };

  const renderImageBlock = (img, index) =>
    img ? (
      <SortableImage
        key={`img-${index}`}
        id={img}
        src={img}
        onDelete={handleDeleteImage}
      />
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.filter(Boolean)}
        strategy={verticalListSortingStrategy}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />

        <div className={styles.gallery}>
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
      </SortableContext>
    </DndContext>
  );
}
