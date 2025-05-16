'use client';
import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import styles from './FestivalGallery.module.scss';

const images = [
  { src: '/images/image.png', alt: 'Grande scène de nuit' },
  { src: '/images/image-1.png', alt: 'Concert avec foule' },
  { src: '/images/image-2.png', alt: 'Drapeaux du festival' },
  { src: '/images/image-3.png', alt: 'Affiches promotionnelles' },
  { src: '/images/image-4.png', alt: 'Public assis au coucher du soleil' },
];

export default function FestivalGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className={styles.gallery}>
      <div className={styles.gallery__main}>
        <Image
          src={images[0].src}
          alt={images[0].alt}
          width={1200}
          height={700}
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          className={styles.gallery__clickable}
        />
      </div>

      <div className={styles.gallery__grid}>
        {images.slice(1).map((img, i) => (
          <div key={i} className={styles.gallery__thumb}>
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={400}
              onClick={() => {
                setIndex(i + 1);
                setOpen(true);
              }}
              className={styles.gallery__clickable}
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={index}
      />
    </section>
  );
}
