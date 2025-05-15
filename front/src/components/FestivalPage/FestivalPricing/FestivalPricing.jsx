import s from "./FesticalPricing.module.scss";

const pricingData = [
  { label: 'Pass 2 jours | samedi + dimanche', price: '100€' },
  { label: 'Pass 1 jour | samedi', price: '60 €' },
  { label: 'Pass 1 jour | dimanche', price: '50 €' },
];

export default function FestivalPricing() {
  return (
    <section className={s.pricing}>
      <div className={s.pricing__title}>TARIFICATIONS</div>
      <table className={s.pricing__table}>
        <thead>
          <tr>
            <th>Tarifs</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {pricingData.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
