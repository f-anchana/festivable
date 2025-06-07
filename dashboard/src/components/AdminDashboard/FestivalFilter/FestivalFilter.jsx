'use client';
import { useState } from "react";

export default function FestivalFilter() {
    const [filter, setFilter] = useState("all");

    return (
        <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => setFilter("all")}>Tous</button>
            <button onClick={() => setFilter("valid")}>Validés</button>
            <button onClick={() => setFilter("invalid")}>Non validés</button>
        </div>
    )
}