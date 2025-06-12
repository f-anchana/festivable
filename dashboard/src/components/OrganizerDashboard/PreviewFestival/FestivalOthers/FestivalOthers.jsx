import FestivalCard from '../../FestivalCard/FestivalCard';
import styles from './FestivalOthers.module.scss';

export default async function FestivalOthers({ currentFestivalId }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/festivals`, {
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
  const otherFestivals = allFestivals.filter(f => f._id !== currentFestivalId && f.valid);

  return (
    <section className={styles.festivalsSection}>
      <div className={styles.festivalIntro}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Autres Festivals</h2>
        </div>

        <div className={styles.cardsWrapper}>
          {otherFestivals.length === 0 && <p>Aucun festival trouvé.</p>}
          {otherFestivals.slice(0, 4).map((festival) => (
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
