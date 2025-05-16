import React from 'react';
import Image from 'next/image';
import styles from './FestivalCard.module.css';

export default function FestivalCard({ title, organisation, date, price, image }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.organisation}>{organisation}</p>
        <p className={styles.date}>{date}</p>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  );
}
