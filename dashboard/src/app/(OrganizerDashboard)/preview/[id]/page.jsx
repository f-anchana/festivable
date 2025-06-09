import styles from "../[id]/preview.module.scss";
import FestivalGallery from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalGallery/FestivalGallery"
import FestivalHeader from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalHeader/FestivalHeader";
import FestivalDescription from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalDescription/FestivalDescription";
import FestivalPricing from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalPricing/FestivalPricing";
import FestivalLocation from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalLocation/FestivalLocation";
import FestivalVolunteer from "../../../../components/OrganizerDashboard/PreviewFestival/FestivalVolunteer/FestivalVolunteer";

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
