"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import s from "./FestivalComment.module.scss";

export default function FestivalComment({ festivalId, onSuccess }) {
  const [user, setUser]       = useState(null);
  const [comment, setComment] = useState("");
  const [disability, setDisability] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError]     = useState(null);

  const API  = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const URL  = `${API}/comment/${festivalId}`;
  const ME   = `${API}/user-profile`;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch(ME, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setUser(await res.json());
      } catch {}
    })();
  }, [ME, token]);

  /* avatar complet – assure /public/ devant */
  const buildAvatar = (src) => {
    if (!src) return `${API}/public/profiles/default3.png`;
    if (/^https?:\/\//i.test(src)) return src;
    const path = src.startsWith("public/") ? src : `public/${src.replace(/^\//, "")}`;
    return `${API}/${path}`;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      setPosting(true);
      setError(null);
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment, disability }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Erreur ${res.status}`);
      }
      setComment("");
      setDisability("");
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  }

  if (!token) {
    return (
      <div className={s.commentBox}>
        <p className={s.needLogin}>Vous devez être connecté pour poster un avis.</p>
        <Link href="/form" className={s.loginBtn}>S’authentifier</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={s.commentBox}>
      <div className={s.profile}>
        <img className={s.avatar} src={buildAvatar(user?.profile_picture)} alt="avatar" />
        <span className={s.pseudo}>{user?.pseudo ?? "Moi"}</span>
      </div>

      <select className={s.select} value={disability} onChange={e=>setDisability(e.target.value)}>
        <option value="">Type de handicap</option>
        <option value="Mobilité réduite">Mobilité réduite</option>
        <option value="Sensoriel">Sensoriel (visuel, auditif…)</option>
        <option value="Trouble cognitif">Trouble cognitif</option>
        <option value="Autre">Autre</option>
      </select>

      <textarea
        className={s.textarea}
        placeholder="Votre commentaire…"
        value={comment}
        onChange={e=>setComment(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" className={s.button} disabled={posting}>
        {posting ? "Envoi…" : "Valider"}
      </button>
    </form>
  );
}