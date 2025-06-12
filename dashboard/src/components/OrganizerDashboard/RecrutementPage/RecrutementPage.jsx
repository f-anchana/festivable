"use client";

import { useState, useEffect } from "react";
import styles from "../../../app/(OrganizerDashboard)/recrutement/Recrutement.module.scss";
import ClassicInput from "../ClassicInput/ClassicInput";
import ClassicTextarea from "../classicTextarea/ClassicTextarea";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MAX_POSTS = 3;

const generateId = () => Date.now() + Math.random().toString(36).slice(2);

const defaultPoste = () => ({
  id: generateId(),
  position: "",
  start_date: "",
  end_date: "",
  contact_email: "",
  paid: "",
  description: "",
});

export default function RecrutementPage() {
  const [postes, setPostes] = useState([defaultPoste()]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchRecruitments = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/my-recruitments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

if (!res.ok) {
  // Ici on considère qu'il n'y a pas de données, on met un poste vide dans le state
  setPostes([{
    id: generateId(),
    position: "",
    start_date: "",
    end_date: "",
    contact_email: "",
    paid: "",
    description: "",
  }]);
  setLoading(false);
  return; // On stoppe la fonction ici, pas besoin de continuer
}

        const data = await res.json();

        // On récupère les recrutements de tous les festivals
        if (Array.isArray(data) && data.length > 0) {
          const allRecruitments = data.flatMap(item => item.recruitments || []);

          const formatted = allRecruitments.map((poste) => ({
            id: poste._id || generateId(),
            position: poste.position || "",
            start_date: poste.start_date?.substring(0, 10) || "",
            end_date: poste.end_date?.substring(0, 10) || "",
            contact_email: poste.contact_email || "",
            paid: poste.paid === true ? true : poste.paid === false ? false : "",
            description: poste.description || "",
          }));

          setPostes(formatted);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitments();
  }, []);

  const handleChange = (index, field, value) => {
    const updatedPostes = [...postes];
    updatedPostes[index] = { ...updatedPostes[index], [field]: value };
    setPostes(updatedPostes);
  };

  const handleAddPoste = () => {
    if (postes.length < MAX_POSTS) {
      setPostes([...postes, defaultPoste()]);
    }
  };

  const handleRemovePoste = (index) => {
    if (postes.length > 1) {
      setPostes(postes.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    for (const poste of postes) {
      if (!poste.position.trim() || !poste.contact_email.trim() || poste.paid === "") {
        alert("Merci de remplir tous les champs obligatoires pour chaque poste.");
        return;
      }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté pour soumettre le formulaire.");
      return;
    }

    setSubmitLoading(true);

    try {
      const payload = {
        recruitments: postes.map(({ id, ...rest }) => ({
          ...rest,
          paid: rest.paid === true,
        })),
      };

      const response = await fetch(`${API_URL}/recruitment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue");
      }

      setSuccessMessage("Vos postes ont bien été envoyés !");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur est survenue lors de l'envoi.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className={styles.container}>
      <h2>À la recherche de bénévoles ou de prestataires ?</h2>
      <p>
        <br />
        Cette section vous permet de centraliser <strong>3 postes</strong> que vous souhaitez pourvoir dans le cadre de votre festival.
      </p>
      <br />
      <p>Pour chaque poste renseigné, vous pouvez indiquer une adresse e-mail de contact dédiée.</p>

      <form onSubmit={handleSubmit} className={styles.poste} noValidate>
        {postes.map((poste, index) => (
          <div key={poste.id} className={styles.formBloc}>
            <div className={styles.headerRow}>
              <h2>Poste n°{index + 1}</h2>
              {postes.length > 1 && (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleRemovePoste(index)}
                  aria-label={`Supprimer le poste ${index + 1}`}
                >
                  Supprimer ✕
                </button>
              )}
            </div>

            <div className={styles.lineTop}>
              <div className={styles.leftColumn}>
                <ClassicInput
                  id={`position-${index}`}
                  label="Nom du poste*"
                  type="text"
                  placeholder="Nom du poste"
                  required
                  value={poste.position}
                  onChange={(e) => handleChange(index, "position", e.target.value)}
                />

                <div className={styles.periodContainer}>
                  <label className={styles.periodLabel}>Période de disponibilité*</label>
                  <div className={styles.dateRow}>
                    <ClassicInput
                      id={`start_date-${index}`}
                      type="date"
                      value={poste.start_date}
                      onChange={(e) => handleChange(index, "start_date", e.target.value)}
                    />
                    <ClassicInput
                      id={`end_date-${index}`}
                      type="date"
                      value={poste.end_date}
                      onChange={(e) => handleChange(index, "end_date", e.target.value)}
                    />
                  </div>
                </div>

                <ClassicInput
                  id={`contact_email-${index}`}
                  label="Mail de contact*"
                  type="email"
                  placeholder="exemple@domaine.com"
                  required
                  value={poste.contact_email}
                  onChange={(e) => handleChange(index, "contact_email", e.target.value)}
                />
              </div>

              <div className={styles.selectContainer}>
                <label htmlFor={`paid-${index}`}>Rémunération*</label>
                <select
                  id={`paid-${index}`}
                  className={styles.select}
                  value={poste.paid === "" ? "" : poste.paid ? "true" : "false"}
                  onChange={(e) => handleChange(index, "paid", e.target.value === "true")}
                  required
                >
                  <option value="">-- Choisir --</option>
                  <option value="true">Rémunéré</option>
                  <option value="false">Bénévole</option>
                </select>
              </div>
            </div>

            <div className={styles.textareaBlock}>
              <ClassicTextarea
                id={`description-${index}`}
                label="Descriptif des missions*"
                placeholder="Détaillez les tâches à effectuer..."
                value={poste.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
              />
            </div>
          </div>
        ))}

        <div className={styles.buttonsContainer}>
          {postes.length < MAX_POSTS && (
            <button type="button" className={styles.addButton} onClick={handleAddPoste}>
              Ajouter un poste +
            </button>
          )}

          <input
            type="submit"
            value={submitLoading ? "Envoi en cours..." : "Valider"}
            className={styles.submitButton}
            disabled={submitLoading}
          />
        </div>

        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </form>
    </div>
  );
}
