'use client';

import styles from "./SearchBar.module.scss"; // tu peux créer un fichier dédié

export default function SearchBar({ value, onChange, placeholder }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={styles.searchInput}
        />
    );
}
