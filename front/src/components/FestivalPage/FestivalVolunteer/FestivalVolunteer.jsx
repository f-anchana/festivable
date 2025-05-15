import s from './FestivalVolunteer.module.scss';

const volunteers = [
  {
    title: 'Bénévole Accueil PMR',
    date: 'Du 12 au 15 Juillet 2025',
    paid: false,
    color: 'blue',
  },
  {
    title: 'Bénévole Accueil PMR',
    date: 'Du 12 au 15 Juillet 2025',
    paid: true,
    color: 'orange',
  },
  {
    title: 'Bénévole Accueil PMR',
    date: 'Du 12 au 15 Juillet 2025',
    paid: true,
    color: 'yellow',
  },
];

export default function FestivalVolunteer() {
  return (
    <section className={s.volunteers}>
      <div className={s.volunteers__title}>ON RECRUTE</div>
      <div className={s.volunteers__intro}>
        <strong>Zeyzey Presents : Recrute des bénévoles !</strong><br />
        Retrouvez plus facilement les offres à pourvoir dès maintenant pour ce festival :
      </div>

      <div className={s.volunteers__cards}>
        {volunteers.map((vol, i) => (
          <div
            key={i}
            className={`${s.volunteer} ${s[`volunteer--${vol.color}`]}`}
          >
            <h3>{vol.title}</h3>
            <p>{vol.date}</p>
            <span className={`${s.volunteer__badge} ${vol.paid ? s.paid : s.unpaid}`}>
              {vol.paid ? 'Rémunéré' : 'Non rémunéré'}
            </span>
            <div className={s.volunteer__buttons}>
              <button className={s.outlined}>Voir la fiche</button>
              <button className={s.filled}>Postuler par mail</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
