export default function EmbedMapPage({ params }) {
  const embedUrl = `${process.env.NEXT_PUBLIC_API_URL}/embed-map/${params.id}`;
  
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="100%"
      style={{ border: "none" }}
      allowFullScreen
      loading="lazy"
    />
  );
}
