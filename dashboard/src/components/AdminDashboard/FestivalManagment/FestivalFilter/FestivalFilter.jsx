'use client';
export default function FestivalFilter({ filter, setFilter }) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => setFilter("all")} disabled={filter === "all"}>Tous</button>
            <button onClick={() => setFilter("valid")} disabled={filter === "valid"}>Validés</button>
            <button onClick={() => setFilter("invalid")} disabled={filter === "invalid"}>Non validés</button>
        </div>
    );
}