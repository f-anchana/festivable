"use client";

import React from "react";
import Image from "next/image";
import styles from "./FestivalCard.module.css";
import { useRouter } from "next/navigation"; // pour Next.js App Router

export default function FestivalCard({
  _id,
  title,
  description,
  startDate,
  endDate,
  address,
  link,
  prices,
  imageSrc,
  pictoaccess,
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/festival/${_id}`);
  };

  if (!title) return <div>Chargement...</div>;

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {pictoaccess && (
        <div
          className={styles.accessibilityIndicator}
          title="Festival accessible"
        >
          <span />
        </div>
      )}

      {imageSrc && (
        <div className={styles.imageWrapper}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={styles.image}
            priority
          />
        </div>
      )}

      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.venue}>{address}</p>
        <div className={styles.dateTimePrice}>
          <span className={styles.date}>
            {new Date(startDate).toLocaleDateString("fr-FR", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </span>
          <span className={styles.price}>
            {prices?.length ? `${prices[0].amount},00 €` : "Gratuit"}
          </span>
        </div>
      </div>
    </div>
  );
}
