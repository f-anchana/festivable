'use client';
import { useState, useEffect } from 'react';
import FestivalCard from '@/components/FestivalCard/FestivalCard';
import styles from '@/app/(with-nav)/Homepage.module.css';

export default function AllFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtres
  const [dateFilter, setDateFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

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

  // Fonction de filtrage
  const filteredFestivals = festivals.filter((festival) => {
    const matchDate =
      !dateFilter ||
      new Date(festival.start_date) >= new Date(dateFilter);

    const matchLocation =
      !locationFilter ||
      festival.address.toLowerCase().includes(locationFilter.toLowerCase());

    return matchDate && matchLocation;
  });

  if (loading) return <p>Chargement des festivals...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>NOS FESTIVALS</h1>

      {/* FILTRES */}
      <div className={styles.filters} style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Filtrer par date (à partir de) :
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ marginLeft: '8px' }}
          />
        </label>

        <label style={{ marginRight: '10px' }}>
          Filtrer par lieu :
          <input
            type="text"
            placeholder="Entrez un lieu"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            style={{ marginLeft: '8px' }}
          />
        </label>

        <button
          onClick={() => {
            setDateFilter('');
            setLocationFilter('');
          }}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: '#eee',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          Réinitialiser filtres
        </button>
      </div>

      {/* LISTE FESTIVALS */}
      <div className={styles.grid}>
        {filteredFestivals.length === 0 && (
          <p>Aucun festival ne correspond aux filtres.</p>
        )}
{filteredFestivals
  .filter((festival) => festival.valid === true) 
  .map((festival) => (
    <FestivalCard
      key={festival._id}
      _id={festival._id} 
      title={festival.title}
      description={festival.description}
      startDate={festival.start_date}
      endDate={festival.end_date}
      address={festival.address}
      link={festival.link}
      prices={festival.prices}
      imageSrc={festival.image} 
      pictoaccess={festival.pictoaccess}
    />
))}

      
      </div>
    </div>
  );
}
