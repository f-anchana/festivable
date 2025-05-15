import React from "react";
import styles from "./festival.module.scss"
import FestivalHeader from "../../../../components/FestivalPage/FestivalHeader/FestivalHeader";
import FestivalDescription from "../../../../components/FestivalPage/FestivalDescription/FestivalDescription";
import FestivalPricing from "../../../../components/FestivalPage/FestivalPricing/FestivalPricing";
import FestivalLocation from "../../../../components/FestivalPage/FestivalLocation/FestivalLocation";
import FestivalVolunteer from "../../../../components/FestivalPage/FestivalVolunteer/FestivalVolunteer";

export default function FestivalPage() {
  return (
    <div>
      <FestivalHeader/>
      <FestivalDescription/>
      <FestivalPricing/>
      <FestivalLocation/>
      <FestivalVolunteer/>
    </div>
  );
}