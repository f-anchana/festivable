'use client';

import { useEffect, useState } from 'react';
import s from "./FesticalPricing.module.scss";
export default function FestivalPricing({ pricing }) {
  if (!pricing || pricing.length === 0) return <p>Pas de tarif disponible.</p>;

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
          {pricing.map((item, index) => (
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
