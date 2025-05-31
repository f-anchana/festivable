'use client';
import { useState, useEffect } from 'react';
import FestivalCard from '@/components/FestivalCard/FestivalCard';
import styles from '@/app/(with-nav)/Homepage.module.css';

export default function AllFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFestivals() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/festivals');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setFestivals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFestivals();
  }, []);

  if (loading) return <p>Chargement des festivals...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>NOS FESTIVALS</h1>
      <div className={styles.grid}>
        {festivals.map((festival) => (
          <FestivalCard
            key={festival._id}
            title={festival.title}
            description={festival.description}
            startDate={festival.start_date}
            endDate={festival.end_date}
            address={festival.address}
            link={festival.link}
            prices={festival.prices}
            imageSrc={festival.image} // adapte selon tes données
          />
        ))}
      </div>
    </div>
  );
}
