import styles from "./MyFestival.module.scss";

import MyFestivalForm from "@/components/OrganizerDashboard/MyFestivalForm/MyFestivalForm";
import AccessibilityFeatures from "@/components/OrganizerDashboard/AccessibilityFeatures/AccessibilityFeatures";

export default function MyFestival() {
    return (
        <div className={styles.page}>
            <MyFestivalForm />
            <AccessibilityFeatures />
        </div>
    );
}