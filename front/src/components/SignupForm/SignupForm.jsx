import styles from "./SignupForm.module.css";

export default function SignupForm() {
    return (
        <div className={`${styles.container} signup-form`}>
            <h2>Créer mon compte</h2>
            <div className={styles.buttoncontainer}>
                <button>
                    <img src="/icones/person.svg" alt=""/>
                    Je suis un festivalier
                </button>
                <button>
                    <img src="/icones/professional.svg" alt="" />
                    Je suis un organisme
                </button>
            </div>
        </div>
    );
}