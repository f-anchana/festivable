"use client";
import { useState } from "react";
import FestivalReviews  from "../FestivalReviews/FestivalReviews";
import FestivalComment  from "../FestivalComment/FestivalComment";
import s from "./ReviewSection.module.scss"

export default function ReviewsSection({ festivalId }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <FestivalReviews key={refreshKey} festivalId={festivalId} />
        <h2 className={s.title}>Votre avis compte aussi !</h2>
      <FestivalComment
        festivalId={festivalId}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />
    </>
  );
}
