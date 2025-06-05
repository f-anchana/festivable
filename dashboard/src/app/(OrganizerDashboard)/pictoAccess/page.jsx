import styles from './PictoAccess.module.scss'; 
import PictoAccessPage from '@/components/OrganizerDashboard/PictoAccessPage/PictoAccessPage';

function PictoAccess() {
  return (
    <div className={styles.page}>
     <PictoAccessPage/>
    </div>
  );
}


export default PictoAccess;
