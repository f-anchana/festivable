'use client';
import styles from './Recrutement.module.scss'; 
import RecrutementPage from '@/components/OrganizerDashboard/RecrutementPage/RecrutementPage'
import { securePage } from '@/components/SecurePage/SecurePage';

function Recrutement() {
  return (
    <div className={styles.page}>
     <RecrutementPage/>
    </div>
  );
}

export default securePage(Recrutement, ["organizer"]);
