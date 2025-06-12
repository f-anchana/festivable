'use client';
import { useState, useEffect } from 'react';
import FestivalCard from '@/components/FestivalCard/FestivalCard';
import styles from '@/app/(with-nav)/Homepage.module.css';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      const response = await fetch(`${API_URL}/festivals`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();

      const festivalsWithCovers = await Promise.all(
        data.map(async (festival) => {
          try {
            const galleryRes = await fetch(`${API_URL}/gallery/${festival._id}`);

            if (galleryRes.status === 404) {
              // Pas de galerie pour ce festival
              return { ...festival, image: null };
            }

            if (!galleryRes.ok) throw new Error('Erreur galerie');

            const galleryData = await galleryRes.json();
            const firstImagePath = galleryData.images?.[0];

            return {
              ...festival,
              image: firstImagePath
                ? `${API_URL}/${firstImagePath.replace(/\\/g, '/')}`
                : null,
            };
          } catch (err) {
            console.error(`Erreur pour la galerie du festival ${festival._id}:`, err);
            return { ...festival, image: null };
          }
        })
      );

      setFestivals(festivalsWithCovers);
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
     <div
  className={styles.filters}
  style={{
    marginBottom: '30px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
  }}
>
  {/* FILTRE DATE */}
  <div style={{ position: 'relative' }}>
    <input
      type="date"
      value={dateFilter}
      onChange={(e) => setDateFilter(e.target.value)}
      style={{
        appearance: 'none',
        padding: '10px 14px',
        borderRadius: '9999px',
        border: 'none',
        backgroundColor: '#f4f4f4',
        fontWeight: 600,
        fontSize: '0.95rem',
        color: '#111',
        cursor: 'pointer',
        boxShadow: 'inset 0 0 0 1px #ddd',
      }}
    />
  </div>

  {/* FILTRE LIEU */}
  <div style={{ position: 'relative' }}>
    <input
      type="text"
      placeholder="Lieu"
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      style={{
        padding: '10px 14px',
        borderRadius: '9999px',
        border: 'none',
        backgroundColor: '#f4f4f4',
        fontWeight: 600,
        fontSize: '0.95rem',
        color: '#111',
        cursor: 'text',
        boxShadow: 'inset 0 0 0 1px #ddd',
      }}
    />
  </div>

  {/* BOUTON RESET */}
  <button
    onClick={() => {
      setDateFilter('');
      setLocationFilter('');
    }}
    style={{
      padding: '10px 16px',
      borderRadius: '9999px',
      backgroundColor: '#f4f4f4',
      fontWeight: 600,
      fontSize: '0.95rem',
      border: 'none',
      cursor: 'pointer',
      boxShadow: 'inset 0 0 0 1px #ddd',
      transition: 'background-color 0.2s',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = '#eaeaea')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#f4f4f4')}
  >
    Réinitialiser
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
