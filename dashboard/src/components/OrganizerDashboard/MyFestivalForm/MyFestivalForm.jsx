'use client';
import ClassicInput from "@/components/OrganizerDashboard/ClassicInput/ClassicInput";
import PriceInput from "@/components/OrganizerDashboard/PriceInput/PriceInput";
import ClassicTextarea from "../classicTextarea/ClassicTextarea";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

import styles from "@/styles/OrganizerDashboard.module.scss";

import { useState, useEffect } from "react";

export default function MyFestivalForm() {

    const [priceInputs, setPriceInputs] = useState([
        { id: 1, id_price: "price1" }
    ]);
    const [festival, setFestival] = useState(null);
    const [message, setMessage] = useState("");

    const handleAddInput = () => {
        if (priceInputs.length >= 5) return;
        const uniqueId = Date.now();
        setPriceInputs([
            ...priceInputs,
            {
                id: uniqueId,
                id_price: `price${priceInputs.length + 1}`
            }
        ]);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return isNaN(date) ? "" : date.toISOString().split("T")[0];
    };


    const handlePriceInputChange = (index, field, value) => {
        const newPriceInputs = [...priceInputs];
        newPriceInputs[index] = {
            ...newPriceInputs[index],
            [field]: value,
        };
        setPriceInputs(newPriceInputs);
    };

    const handleRemoveLastInput = () => {
        if (priceInputs.length > 1) {
            setPriceInputs(priceInputs.slice(0, -1));
        }
    };

    //RECUPERATION DES DONNEES DU FESTIVAL EN FONCTION DU COMPTE CONNECTE
    useEffect(() => {
        const fetchFestival = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch(`${API_URL}/my-festival`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Erreur lors de la récupération du festival");

                const data = await res.json();
                setFestival(data);

                // Remplir priceInputs depuis la BDD
                if (data.prices && Array.isArray(data.prices)) {
                    const formattedPrices = data.prices.map((price, index) => ({
                        id: Date.now() + index,
                        id_price: `price${index + 1}`,
                        type: price.type || "",
                        amount: price.amount || ""
                    }));
                    setPriceInputs(formattedPrices);
                }

            } catch (err) {
                console.error(err);
            }
        };

        fetchFestival();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prépare les données à envoyer
        const payload = {
            ...festival,
            prices: priceInputs.map(({ type, amount }) => ({
                type,
                amount
            })),
        };

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/my-festival/update`, {
                method: "PUT", // ou POST selon ton API
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error("Erreur lors de la mise à jour du festival");
            }

            const updatedFestival = await res.json();
            setFestival(prev => ({ ...prev, ...updatedFestival }));
            // met à jour avec les données renvoyées

            setMessage("Festival mis à jour avec succès !");
        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de la mise à jour, veuillez réessayer.");
            alert("Erreur lors de la mise à jour, veuillez réessayer.");
        }
    };

    if (!festival) {
        return (
            <div className={styles.errorContainer}>
                <h2>Votre session a expiré</h2>
                <p>
                    Veuillez vous reconnecter pour continuer.<br />
                    Si le problème persiste, contactez-nous à l'adresse : <strong>support@monfestival.com</strong>.
                </p>
            </div>

        );
    }

    return (
        <div>
            <form className={styles.myFestivalForm} onSubmit={handleSubmit}>
                <div className={styles.flex}>
                    <div className={styles.firstContainer}>
                        <fieldset className={styles.fieldset}>
                            <h2>Événement</h2>
                            <ClassicInput
                                id="title"
                                label="Titre*"
                                type="text"
                                placeholder="Nom de l'événement"
                                required
                                value={festival.title}
                                onChange={e => setFestival({ ...festival, title: e.target.value })}
                            />
                            <ClassicInput
                                id="start_date"
                                label="Date de début*"
                                type="date"
                                required
                                value={formatDate(festival.start_date)}
                                onChange={e => setFestival({ ...festival, start_date: e.target.value })}
                            />
                            <ClassicInput
                                id="end_date"
                                label="Date de fin*"
                                type="date"
                                required
                                value={formatDate(festival.end_date)}
                                onChange={e => setFestival({ ...festival, end_date: e.target.value })}
                            />
                            <ClassicInput
                                id="address"
                                label="Lieu*"
                                type="text"
                                placeholder="11 rue de ..."
                                required
                                value={festival.address}
                                onChange={e => setFestival({ ...festival, address: e.target.value })}
                            />
                            <ClassicInput
                                id="link"
                                label="Votre site web"
                                type="text"
                                placeholder="www.festival.com"
                                value={festival.link}
                                onChange={e => setFestival({ ...festival, link: e.target.value })}
                            />
                        </fieldset>

                        <fieldset className={styles.fieldset}>
                            <h2>Détails de l'événement</h2>
                            <ClassicTextarea
                                id="description"
                                label="Description*"
                                placeholder="Donnez envie aux gens de venir à votre festival et mettez en avant l'accéssibilité"
                                value={festival.description}
                                onChange={e => setFestival({ ...festival, description: e.target.value })}
                            ></ClassicTextarea>
                        </fieldset>
                    </div>
                    <div className={styles.secondContainer}>
                        <fieldset className={styles.fieldset}>
                            <h2>Tarifs</h2>
                            {priceInputs.map((priceInput, index) => (
                                <PriceInput
                                    key={priceInput.id}
                                    id={`type${index + 1}`}
                                    id_price={priceInput.id_price}
                                    label={`Type ${index + 1}`}
                                    type="text"
                                    placeholderType="Ex: Pass 1 jour"
                                    placeholderPrice="Ex: 80€"
                                    valueType={priceInput.type}
                                    valueAmmount={priceInput.amount}
                                    onChangeType={(e) => handlePriceInputChange(index, 'type', e.target.value)}
                                    onChangeAmount={(e) => handlePriceInputChange(index, 'amount', e.target.value)}
                                />
                            ))}

                            <div className={styles.buttons}>
                                {priceInputs.length < 5 && (
                                    <button type="button" onClick={handleAddInput}>
                                        Ajouter +
                                    </button>
                                )}
                                {priceInputs.length > 1 && (
                                    <button type="button" onClick={handleRemoveLastInput}>
                                        Suprimer -
                                    </button>
                                )}
                            </div>
                        </fieldset>
                    </div>
                </div>
                <input type="submit" name="Valider" value="Valider" id="" />
                {message && (
                    <span className={styles.successMessage}>
                        {message}
                    </span>
                )}
            </form>
        </div>
    )
}