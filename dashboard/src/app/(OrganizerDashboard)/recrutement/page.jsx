'use client';
import styles from './Recrutement.module.scss'; 
import RecrutementPage from '@/components/OrganizerDashboard/RecrutementPage/RecrutementPage'


function Recrutement() {
  return (
    <div className={styles.page}>
     <RecrutementPage/>
    </div>
  );
}

export default Recrutement;
