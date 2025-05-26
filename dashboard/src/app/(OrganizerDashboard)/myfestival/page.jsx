'use client';
import styles from "./MyFestival.module.scss";
import { securePage } from "@/components/SecurePage/SecurePage";

import MyFestivalForm from "@/components/OrganizerDashboard/MyFestivalForm/MyFestivalForm";
import AccessibilityFeatures from "@/components/OrganizerDashboard/AccessibilityFeatures/AccessibilityFeatures";

function MyFestival() {
    return (
            <div className={styles.page}>
                <MyFestivalForm />
            </div>
    );
}

export default securePage(MyFestival);