// Modal.js
import React from "react";
import styles from "./ConfrimAction.module.scss";

export default function ConfirmAction({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.confirm}>Confirmer</button>
          <button onClick={onClose} className={styles.cancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
}