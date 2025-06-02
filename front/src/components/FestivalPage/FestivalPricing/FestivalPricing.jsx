'use client';

import { useEffect, useState } from 'react';
import s from "./FesticalPricing.module.scss";

export default function FestivalPricing({ id }) {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/festival/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.prices) {
          setPrices(data.prices);
        }
      })
      .catch(err => console.error("Erreur lors du fetch des prix :", err));
  }, [id]);

  if (prices.length === 0) return <p>Chargement des prix...</p>;

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
          {prices.map((item, index) => (
            <tr key={item._id || index}>
              <td>{item.type}</td>
              <td>{item.amount} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
