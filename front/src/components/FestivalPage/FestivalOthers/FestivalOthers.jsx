import FestivalCard from '../../FestivalCard/FestivalCard';
import styles from './FestivalOthers.module.scss';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function FestivalOthers({ currentFestivalId }) {
  const res = await fetch(`${API_URL}/festivals`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <section className={styles.festivalsSection}>
        <p style={{ color: '#8B0000' }}>Erreur : impossible de charger les festivals.</p>
      </section>
    );
  }

  const allFestivals = await res.json();
  const filteredFestivals = allFestivals.filter(f => f._id !== currentFestivalId && f.valid);

  // 🧠 Enrichir les festivals avec leurs images
  const enrichedFestivals = await Promise.all(
    filteredFestivals.map(async (festival) => {
      try {
        const galleryRes = await fetch(`${API_URL}/gallery/${festival._id}`);

        if (galleryRes.status === 404) return { ...festival, image: null };

        const galleryData = await galleryRes.json();
        const firstImagePath = galleryData.images?.[0];

        return {
          ...festival,
          image: firstImagePath
            ? `${API_URL}/${firstImagePath.replace(/\\/g, '/')}`
            : null,
        };
      } catch (err) {
        console.error(`Erreur galerie pour le festival ${festival._id}`, err);
        return { ...festival, image: null };
      }
    })
  );

  return (
    <section className={styles.festivalsSection}>
      <div className={styles.festivalIntro}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Autres Festivals</h2>
        </div>

        <div className={styles.cardsWrapper}>
          {enrichedFestivals.length === 0 && <p>Aucun festival trouvé.</p>}
          {enrichedFestivals.slice(0, 4).map((festival) => (
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
    </section>
  );
}
