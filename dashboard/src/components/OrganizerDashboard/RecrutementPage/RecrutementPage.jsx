"use client";
import { useState } from "react";
import styles from "../../../app/(OrganizerDashboard)/recrutement/Recrutement.module.scss";
import ClassicInput from "../ClassicInput/ClassicInput";
import ClassicTextarea from "../classicTextarea/ClassicTextarea";

export default function RecrutementPage() {
  const [poste, setPoste] = useState({
    position: "",
    startDate: "",
    endDate: "",
    contact_email : "",
    paid: "",
    description: ""
  });

  return (
    <div className={styles.container}>
      <h2>À la recherche de bénévoles ou de prestataires ?</h2>
      <p>
        <br />
        Cette section vous permet de centraliser <strong>3 postes</strong> que vous
        souhaitez pourvoir dans le cadre de votre festival.
      </p>
      <br />
      <p>
        Pour chaque poste renseigné, vous pouvez indiquer une adresse e-mail de
        contact dédiée. Celle-ci sera utilisée par les personnes intéressées pour
        postuler ou poser des questions en lien avec le poste proposé.
      </p>

      <div className={styles.poste}>
        <h2>Poste n°1</h2>

        <div className={styles.lineTop}>
          <div className={styles.leftColumn}>
            <ClassicInput
              id="title"
              label="Nom du poste*"
              type="text"
              placeholder="Nom du poste"
              required
              value={poste.title}
              onChange={(e) => setPoste({ ...poste, title: e.target.value })}
            />

            <div className={styles.sectionLabel}>Période de disponibilité</div>
            <div className={styles.dateRow}>
              <ClassicInput
                id="startDate"
                type="date"
                value={poste.startDate}
                onChange={(e) => setPoste({ ...poste, startDate: e.target.value })}
              />
              <ClassicInput
                id="endDate"
                type="date"
                value={poste.endDate}
                onChange={(e) => setPoste({ ...poste, endDate: e.target.value })}
              />
            </div>

            <ClassicInput
              id="contact"
              label="Mail de contact"
              type="email"
              placeholder="exemple@domaine.com"
              value={poste.contact}
              onChange={(e) => setPoste({ ...poste, contact: e.target.value })}
            />
          </div>

          <div className={styles.selectContainer}>
            <label htmlFor="remuneration">Rémunération</label>
            <select
              id="remuneration"
              className={styles.select}
              value={poste.remuneration}
              onChange={(e) => setPoste({ ...poste, remuneration: e.target.value })}
            >
              <option value="Rémunéré">Rémunéré</option>
              <option value="Bénévole">Bénévole</option>
            </select>
          </div>
        </div>

        <div className={styles.textareaBlock}>
          <ClassicTextarea
            id="description"
            label="Descriptif des missions"
            placeholder="Détaillez les tâches à effectuer..."
            value={poste.description}
            onChange={(e) => setPoste({ ...poste, description: e.target.value })}
          />

          <button className={styles.addButton}>Ajouter un poste</button>
        </div>
                        <input type="submit" name="Valider" value="Valider" id="" />

      </div>
    </div>
  );
}
