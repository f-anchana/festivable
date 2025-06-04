import styles from "./RadioSection.module.scss";
import ClassicRadioInput from "@/components/OrganizerDashboard/ClassicRadioInput/ClassicRadioInput";

export default function RadioSection({ questions = [], title }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
        {questions.map(({ name, question, value }) => (
          <ClassicRadioInput key={name} name={name} question={question} />
        ))}   {/* D'adapte au nombre de questions */}
    </div>
  );
}
