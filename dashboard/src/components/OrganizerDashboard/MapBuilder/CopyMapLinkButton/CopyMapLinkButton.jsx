"use client";
import { useState } from "react";

export default function CopyMapLinkButton({ festivalId }) {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const embedUrl = `${process.env.NEXT_PUBLIC_API_URL}/embed-map/${festivalId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Erreur lors de la copie du lien");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={handleCopy} style={{ padding: "0.5rem 1rem", borderRadius: 5 }}>
        📋 Copier le lien de la carte
      </button>
      {copied && <p style={{ color: "green" }}>Lien copié !</p>}
    </div>
  );
}
