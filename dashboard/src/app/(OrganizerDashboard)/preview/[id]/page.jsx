import styles from "../[id]/preview.module.scss";
import FestivalGallery from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalGallery/FestivalGallery"
import FestivalHeader from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalHeader/FestivalHeader";
import FestivalDescription from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalDescription/FestivalDescription";
import FestivalPricing from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalPricing/FestivalPricing";
import FestivalLocation from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalLocation/FestivalLocation";
import FestivalVolunteer from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalVolunteer/FestivalVolunteer";
import FestivalAccessibility from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalAccessibility/FestivalAccessibility";

export default async function FestivalPage({ params }) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/festival/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Festival non trouvé');
  const festival = await res.json();

  return (
    <div className={styles.festivalGrid}>
      <div className={styles.mobile}>
        <FestivalGallery id={id} />
      </div>
      <div className={styles.left}>
        <FestivalHeader festival={festival} />
        <FestivalDescription festival={festival} />
        <FestivalAccessibility answers={festival.accessibility} />
      </div>
      <div className={styles.right}>
        <div className={styles.pc}>
          <FestivalGallery id={id} />
        </div>
        <FestivalPricing pricing={festival.prices} />
      </div>
      <div className={styles.fullWidth}>
        <FestivalLocation id={id} />
        <FestivalVolunteer festivalId={festival._id} />
      </div>
    </div>
  );
}
