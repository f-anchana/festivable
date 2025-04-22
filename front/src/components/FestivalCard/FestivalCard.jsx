import React from 'react';
import Image from 'next/image';
import styles from './FestivalCard.module.css';

export default function FestivalCard({ title, date, price, image }) {
  return (
    <div className={styles.card}>
      <Image src={image} alt={title} width={300} height={200} className={styles.image} />
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.date}>{date}</p>
      <p className={styles.price}>{price}</p>
    </div>
  );
}
