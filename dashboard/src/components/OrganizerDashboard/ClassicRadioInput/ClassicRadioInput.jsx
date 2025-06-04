import styles from "./ClassicRadioInput.module.scss";

export default function ClassicRadioInput({
    id,
    name,
    onChange,
    question,
    checked = false
}) {
    return (
        <div className={styles.inputContainer}>
            <p>{question}</p>

            <div className={styles.radioGroup}>
                <label>
                    Oui
                    <input type="radio" value="true" name={name} defaultChecked={checked}/>
                </label>

                <label>
                    Non
                    <input type="radio" value="false" name={name} defaultChecked={checked} />
                </label>
            </div>

        </div>
    );
}
