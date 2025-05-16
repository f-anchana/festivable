import styles from "./MyFestival.module.scss";

import MyFestivalForm from "@/components/OrganizerDashboard/MyFestivalForm/MyFestivalForm";

export default function MyFestival() {
    return (
        <div>
            <h1>Mon Festival</h1>
            <MyFestivalForm />
        </div>
    );
}