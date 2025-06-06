import styles from "../../festival/[id]/festival.module.scss";
import FestivalGallery from "../../../../../components/FestivalPage/FestivalGallery/FestivalGallery";
import FestivalHeader from "../../../../../components/FestivalPage/FestivalHeader/FestivalHeader";
import FestivalDescription from "../../../../../components/FestivalPage/FestivalDescription/FestivalDescription";
import FestivalPricing from "../../../../../components/FestivalPage/FestivalPricing/FestivalPricing";
import FestivalLocation from "../../../../../components/FestivalPage/FestivalLocation/FestivalLocation";
import FestivalVolunteer from "../../../../../components/FestivalPage/FestivalVolunteer/FestivalVolunteer";

export default function FestivalPage({ params }) {
  const { id } = params;

  return (
    <div className={styles.festivalGrid}>
      <div className={styles.mobile}>
        <FestivalGallery id={id} />
      </div>
      <div className={styles.left}>
        <FestivalHeader id={id} />
        <FestivalDescription id={id} />
      </div>

      <div className={styles.right}>
        <div className={styles.pc}>
          <FestivalGallery id={id}/>
        </div>
        <FestivalPricing id={id} />
      </div>

      <div className={styles.fullWidth}>
        <FestivalLocation id={id} />
        <FestivalVolunteer id={id} />
      </div>
    </div>
  );
}
