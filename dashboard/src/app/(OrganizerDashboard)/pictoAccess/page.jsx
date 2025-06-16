'use client';
import styles from './PictoAccess.module.scss'; 
import PictoAccessPage from '@/components/OrganizerDashboard/PictoAccessPage/PictoAccessPage';
import { securePage } from '@/components/SecurePage/SecurePage';

function PictoAccess() {
  return (
    <div className={styles.page}>
     <PictoAccessPage/>
    </div>
  );
}

export default securePage(PictoAccess, ["organizer"]);