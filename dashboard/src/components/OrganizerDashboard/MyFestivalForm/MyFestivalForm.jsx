'use client';
import ClassicInput from "@/components/OrganizerDashboard/ClassicInput/ClassicInput";
import PriceInput from "@/components/OrganizerDashboard/PriceInput/PriceInput";
import ClassicTextarea from "@/components/OrganizerDashboard/classicTextarea/ClassicTextarea";

import styles from "@/styles/OrganizerDashboard.module.scss";

import { useState } from "react";

export default function MyFestivalForm() {
    const [priceInputs, setPriceInputs] = useState([
        { id: 1, id_price: "price1" }
    ]);

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


    const handleRemoveLastInput = () => {
        if (priceInputs.length > 1) {
            setPriceInputs(priceInputs.slice(0, -1));
        }
    };

    return (
        <div>
            <form action="" className={styles.myFestivalForm}>
                <div className={styles.flex}>
                    <div className={styles.firstContainer}>
                        <fieldset className={styles.fieldset}>
                            <h2>Événement</h2>
                            <ClassicInput
                                id="titre"
                                label="Titre*"
                                type="text"
                                placeholder="Nom de l'événement"
                                required
                            />
                            <ClassicInput
                                id="start_date"
                                label="Date de début*"
                                type="date"
                                required
                            />
                            <ClassicInput
                                id="end_date"
                                label="Date de fin*"
                                type="date"
                                required
                            />
                            <ClassicInput
                                id="place"
                                label="Lieu*"
                                type="text"
                                placeholder="52 Rue General Moutarde Nantes"
                                required
                            />
                            <ClassicInput
                                id="link"
                                label="Votre site web"
                                type="text"
                                placeholder="www.festival.com"
                            />
                        </fieldset>

                        <fieldset className={styles.fieldset}>
                            <h2>Détails de l'événement</h2>
                            <ClassicTextarea
                                label="Description*"
                                placeholder="Donnez envie aux gens de venir à votre festival et mettez en avant l'accéssibilité"
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
            </form>
        </div>
    )
}