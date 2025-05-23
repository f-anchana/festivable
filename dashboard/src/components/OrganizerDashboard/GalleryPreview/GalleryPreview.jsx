import styles from './GalleryPreview.module.scss';
import Image from 'next/image';

export default function GalleryPreview({ images = [], onAddImage }) {
  const mainImage = images[0];
  const sideImages = images.slice(1, 9);
  const remainingImages = images.slice(10);
  const totalSlots = 20;
  const emptySlots = totalSlots - images.length;

  return (
    <div className={styles.gallery}>
      <div className={styles.gallery__main}>
        {mainImage && (
          <Image
            src={mainImage}
            alt="Image principale"
            width={800}
            height={500}
          />
        )}
      </div>

      <div className={styles.gallery__sideGrid}>
        {sideImages.map((img, i) => (
          <Image
            key={`side-${i}`}
            src={img}
            alt={`Image ${i + 2}`}
            width={150}
            height={100}
            className={styles.gallery__thumb}
          />
        ))}
      </div>

      <div className={styles.gallery__galleryGrid}>
        {remainingImages.map((img, i) => (
          <Image
            key={`grid-${i}`}
            src={img}
            alt={`Image ${i + 6}`}
            width={150}
            height={100}
            className={styles.gallery__thumb}
          />
        ))}

        {[...Array(emptySlots - sideImages.length)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className={styles.gallery__placeholder}
            onClick={onAddImage}
          >
            +
          </div>
        ))}
      </div>
    </div>
  );
}
