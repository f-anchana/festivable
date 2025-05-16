import React from "react";
import styles from "../../../../styles/Festival.module.scss";
import FestivalGallery from "../../../../components/FestivalPage/FestivalGallery/FestivalGallery";
import FestivalHeader from "../../../../components/FestivalPage/FestivalHeader/FestivalHeader";
import FestivalDescription from "../../../../components/FestivalPage/FestivalDescription/FestivalDescription";
import FestivalPricing from "../../../../components/FestivalPage/FestivalPricing/FestivalPricing";
import FestivalLocation from "../../../../components/FestivalPage/FestivalLocation/FestivalLocation";
import FestivalVolunteer from "../../../../components/FestivalPage/FestivalVolunteer/FestivalVolunteer";

export default function FestivalPage() {
  return (
    <div className={styles.festivalGrid}>
      <div className={styles.mobile}>
      <FestivalGallery />
      </div>
      <div className={styles.left}>
        <FestivalHeader />
        <FestivalDescription />
      </div>

      <div className={styles.right}>
        <div className={styles.pc}>
        <FestivalGallery />
        </div>
        <FestivalPricing />
      </div>

      {/* Ligne pleine largeur */}
      <div className={styles.fullWidth}>
        <FestivalLocation />
        <FestivalVolunteer />
      </div>
    </div>
  );
}
