import styles from "./RadioSection.module.scss";
import ClassicRadioInput from "@/components/OrganizerDashboard/ClassicRadioInput/ClassicRadioInput";

export default function RadioSection({ questions = [], title, answers = {}, onAnswerChange }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {questions.map(({ name, question }) => (
        <ClassicRadioInput
          key={name}
          name={name}
          question={question}
          value={answers?.[name] ?? null}// Prend la valeur de la réponse pour cette question, ou null si pas de réponse
          onChange={(val) => onAnswerChange(name, val)}
        />
      ))}
    </div>
  );
}