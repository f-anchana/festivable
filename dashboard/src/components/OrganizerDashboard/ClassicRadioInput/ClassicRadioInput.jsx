import styles from "./ClassicRadioInput.module.scss";

export default function ClassicRadioInput({
    id,
    name,
    onChange,
    question
}) {
    return (
        <div className={styles.inputContainer}>
            <p>{question}</p>

            <div className={styles.radioGroup}>
                <label>
                    Oui
                    <input type="radio" value="true" name={name} />
                </label>

                <label>
                    Non
                    <input type="radio" value="false" name={name} />
                </label>
            </div>

        </div>
    );
}
