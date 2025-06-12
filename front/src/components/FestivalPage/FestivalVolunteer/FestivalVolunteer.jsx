'use client';

import { useEffect, useState } from 'react';
import s from './FestivalVolunteer.module.scss';

export default function FestivalVolunteer({ festivalId }) {
  const [recruitments, setRecruitments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[🔍] festivalId reçu :', festivalId);

    if (!festivalId) {
      console.warn('[⛔] Aucun festivalId fourni');
      return;
    }

    const fetchRecruitments = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/recruitments/${festivalId}`;
        console.log('[🌐] Appel API vers :', url);

        const res = await fetch(url);
        const data = await res.json();
        console.log('[📦] Données récupérées :', data);

        // ✅ On accède à l'objet dans le tableau, puis à sa propriété .recruitments
        const trueData = Array.isArray(data) ? data[0]?.recruitments || [] : [];
        setRecruitments(trueData);
      } catch (err) {
        console.error('[❌] Erreur fetch recruitments :', err);
        setRecruitments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, [festivalId]);

  if (loading) {
    return <p>Chargement des offres de bénévolat...</p>;
  }

  if (!recruitments.length) {
    return <p>Aucune offre de bénévolat disponible pour ce festival.</p>;
  }

  return (
    <section className={s.volunteers} aria-labelledby="titre-benevolat">
      <div id="titre-benevolat" className={s.volunteers__title}>
        ON RECRUTE
      </div>

      <div className={s.volunteers__intro}>
        Retrouvez les offres à pourvoir dès maintenant pour ce festival :
      </div>

      <div className={s.volunteers__cards} role="list">
        {recruitments.map((r, i) => (
          <div
            key={i}
className={`${s.volunteer} ${s[`volunteer--${i === 0 ? 'blue' : i === 1 ? 'orange' : 'yellow'}`]}`}
            role="listitem"
          >
            <h2 className={s.volunteer__title}>{r.position}</h2>
            <p className={s.volunteer__date}>
              Du {new Date(r.start_date).toLocaleDateString()} au{' '}
              {new Date(r.end_date).toLocaleDateString()}
            </p>
            <span
              className={`${s.volunteer__badge} ${
                r.paid ? s.paid : s.unpaid
              }`}
            >
              {r.paid ? 'Rémunéré' : 'Non rémunéré'}
            </span>

            <div className={s.volunteer__buttons}>
              <button className={s.outlined}>Voir la fiche</button>
              <a
                href={`mailto:${r.contact_email}`}
                className={s.filled}
                aria-label={`Postuler par mail pour ${r.position}`}
              >
                Postuler par mail
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}