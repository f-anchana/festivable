import EmbedMapClient from "../../../components/OrganizerDashboard/EmbedMapClient/EmbedMapClient";

export default function EmbedMapPage({ params }) {
  const { id } = params;

  return <EmbedMapClient id={id} />;
}
