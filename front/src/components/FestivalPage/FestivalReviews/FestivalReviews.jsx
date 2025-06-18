"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import s from "./FestivalReviews.module.scss";

const COMMENTS_PER_PAGE = 3;

export default function AccessibilityReviews({ festivalId }) {
  const [comments, setComments]     = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [userId, setUserId]         = useState(null);          // ← id de l’utilisateur connecté

  const API  = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const COMMENTS_URL = `${API}/comments/${festivalId}`;
  const PROFILE_URL  = `${API}/user-profile`;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ────────── charge profil pour savoir quel commentaire est à moi ────────── */
  useEffect(() => {
    if (!token) return;
    (async () => {
      const res = await fetch(PROFILE_URL, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setUserId(data._id);
      } else if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
      }
    })();
  }, [PROFILE_URL, token]);

  /* ────────── fetch commentaires ────────── */
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

/* ────────── suppression avec confirmation ────────── */
async function handleDelete(commentId) {
  if (!token) return;

  const ok = window.confirm(
    "Êtes-vous sûr de vouloir supprimer votre commentaire ? Cette action est définitive."
  );
  if (!ok) return;

  try {
    const res = await fetch(`${API}/my-comment/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setComments((prev) => prev.filter((c) => c._id !== commentId));
  } catch {
    /* erreur silencieuse ou toast selon ton besoin */
  }
}


  /* ────────── helpers ────────── */
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const paginated  = comments.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );
  const changePage = (p) => p >= 1 && p <= totalPages && setCurrentPage(p);

  const buildAvatar = (src) => {
    if (!src) return "/avatar-placeholder.png";
    if (/^https?:\/\//i.test(src)) return src;
    return `${API}/${src.replace(/^\//, "")}`;
  };

  /* ────────── UI ────────── */
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
          {/* bouton X si c’est mon commentaire */}
          {userId === c.userId?._id && (
            <button
              className={s.deleteBtn}
              onClick={() => handleDelete(c._id)}
              aria-label="Supprimer mon commentaire"
            >
              ✕
            </button>
          )}

          <img src={buildAvatar(c.userId?.profile_picture)} alt="avatar" />
          <div className={s.commentContent}>
            <p className={s.commentMeta}>
              <span className={s.pseudo}>{c.userId?.pseudo ?? "Anonyme"}</span>
              {c.disability && (
                <>
                  <span className={s.separator}> – </span>
                  <span>{c.disability}</span>
                </>
              )}
              <span className={s.separator}> – </span>
              <span className={s.date}>{new Date(c.date).toLocaleDateString()}</span>
            </p>
            <p className={s.commentText}>“{c.comment}”</p>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className={s.pagination}>
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
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
          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
            {">"}
          </button>
        </div>
      )}
    </section>
  );
}
