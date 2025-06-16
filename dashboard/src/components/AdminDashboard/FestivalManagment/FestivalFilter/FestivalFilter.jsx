import styles from "./FestivalFilter.module.scss";

export default function FestivalFilter({ filter, setFilter }) {
    return (
        <div className={styles.container} style={{ marginBottom: "1rem" }}>
<button
                onClick={() => setFilter("all")}
                disabled={filter === "all"}
                className={filter === "all" ? styles.active : ""}
            >
                Tous
            </button>
            <button
                onClick={() => setFilter("valid")}
                disabled={filter === "valid"}
                className={filter === "valid" ? styles.active : ""}
            >
                Validés
            </button>
            <button
                onClick={() => setFilter("invalid")}
                disabled={filter === "invalid"}
                className={filter === "invalid" ? styles.active : ""}
            >
                Non validés
            </button>
        </div>
    );
}