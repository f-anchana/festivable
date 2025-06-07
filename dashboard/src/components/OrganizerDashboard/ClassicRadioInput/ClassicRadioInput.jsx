import styles from "./ClassicRadioInput.module.scss";

export default function ClassicRadioInput({
    name,
    onChange,
    question,
    value = null
}) {
    return (
        <div className={styles.inputContainer}>
            <p>{question}</p>

            <div className={styles.radioGroup}>
                <label>
                    Oui
                    <input
                        type="radio"
                        value="true"
                        name={name}
                        checked={value === true}
                        onChange={() => onChange(true)}
                    />
                </label>

                <label>
                    Non
                    <input
                        type="radio"
                        value="false"
                        name={name}
                        checked={value === false}
                        onChange={() => onChange(false)}
                    />
                </label>
            </div>
        </div>
    );
}
