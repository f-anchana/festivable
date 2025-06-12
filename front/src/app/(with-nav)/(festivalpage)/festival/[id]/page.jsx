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

  const res = await fetch(`http://localhost:3000/festival/${id}`);
  if (!res.ok) throw new Error('Festival non trouvé');
  const festival = await res.json();

  const resOthers = await fetch(`http://localhost:3000/festivals`);
  const allFestivals = await resOthers.json();

  const otherFestivals = allFestivals.filter(f => f._id !== id);

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
        <FestivalOthers festivals={otherFestivals} />
      </div>
    </div>
  );
}
