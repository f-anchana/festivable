import styles from "../../festival/[id]/festival.module.scss";
import FestivalGallery from "../../../../../components/FestivalPage/FestivalGallery/FestivalGallery";
import FestivalHeader from "../../../../../components/FestivalPage/FestivalHeader/FestivalHeader";
import FestivalDescription from "../../../../../components/FestivalPage/FestivalDescription/FestivalDescription";
import FestivalPricing from "../../../../../components/FestivalPage/FestivalPricing/FestivalPricing";
import FestivalLocation from "../../../../../components/FestivalPage/FestivalLocation/FestivalLocation";
import FestivalVolunteer from "../../../../../components/FestivalPage/FestivalVolunteer/FestivalVolunteer";
import FestivalAccessibility from "../../../../../components/FestivalPage/FestivalAccessibility/FestivalAccessibility";
import FestivalOthers from "../../../../../components/FestivalPage/FestivalOthers/FestivalOthers";

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
        <FestivalOthers currentFestivalId={festival._id} />
      </div>
    </div>
  );
}
