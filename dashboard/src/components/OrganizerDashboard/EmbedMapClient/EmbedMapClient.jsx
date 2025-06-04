"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MapCanvasEmbed = dynamic(
  () => import("../MapViewer/MapCanvasEmbed"),
  { ssr: false }
);

export default function EmbedMapClient({ id }) {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/map/${id}`)
      .then((res) => res.json())
      .then(setMapData)
      .catch(console.error);
  }, [id]);

  if (!mapData) return <p>Chargement de la carte...</p>;

  return <MapCanvasEmbed mapData={mapData} />;
}
