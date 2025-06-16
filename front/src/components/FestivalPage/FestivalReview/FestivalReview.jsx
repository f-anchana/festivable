"use client";

import { useEffect, useState } from "react";
import s from "./FestivalReview.module.scss";

const COMMENTS_PER_PAGE = 3;

export default function AccessibilityReviews({ festivalId }) {
  /* états */
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* URLs */
  const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
  const COMMENTS_URL = `${API_BASE.replace(/\/$/, "")}/comments/${festivalId}`;

  /* fetch commentaires */
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(COMMENTS_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        setComments(await res.json());
      } catch (e) {
        if (e.name !== "AbortError") setError(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [COMMENTS_URL]);

  /* pagination */
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const paginated = comments.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );
  const changePage = (p) => p >= 1 && p <= totalPages && setCurrentPage(p);

  /* avatar absolu */
  const buildAvatar = (src) => {
    if (!src) return "/avatar-placeholder.png";
    if (/^https?:\/\//i.test(src)) return src;
    return `${API_BASE.replace(/\/$/, "")}/${src.replace(/^\//, "")}`;
  };

  /* render */
  return (
    <section className={s.accessibilitySection}>
      <h2>AVIS SUR L’ACCESSIBILITÉ</h2>
      <p className={s.description}>
        Retrouvez les derniers commentaires des festivaliers sur l’accessibilité
        de l’événement.
      </p>

      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {paginated.map((c) => (
        <div key={c._id} className={s.commentCard}>
          <img
            src={buildAvatar(c.userId?.profile_picture)}
            alt={c.userId?.pseudo ?? "avatar"}
          />
          <div className={s.commentContent}>
            {(() => {
              const parts = [
                c.userId?.pseudo ?? "Anonyme",
                c.disability && c.disability.trim(), // ne garde que si défini
                new Date(c.date).toLocaleDateString(),
              ].filter(Boolean); // supprime les valeurs vides

              return (
                <p className={s.commentMeta}>
                  <span className={s.pseudo}>
                    {c.userId?.pseudo ?? "Anonyme"}
                  </span>

                  {c.disability && (
                    <>
                      <span className={s.separator}> – </span>
                      <span>{c.disability}</span>
                    </>
                  )}
                  <span className={s.separator}> – </span>
                  <span className={s.date}>
                    {new Date(c.date).toLocaleDateString()}
                  </span>
                </p>
              );
            })()}
            <p className={s.commentText}>“{c.comment}”</p>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className={s.pagination}>
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={i + 1 === currentPage ? s.active : undefined}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </section>
  );
}
