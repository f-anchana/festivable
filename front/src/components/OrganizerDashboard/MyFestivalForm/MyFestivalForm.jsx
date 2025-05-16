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

    const handleAddPriceInput = () => {
        if (priceInputs.length >= 5) return;
        const newId = priceInputs.length + 1;
        setPriceInputs([
            ...priceInputs,
            { id: newId, id_price: `price${newId}` }
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
                    <div className={styles.fullWidth}>
                        <fieldset className={styles.fieldset}>
                            <h2>Événement</h2>
                            <ClassicInput
                                id="titre"
                                label="Titre"
                                type="text"
                                required
                            />
                            <ClassicInput
                                id="date"
                                label="Date"
                                type="date"
                                required
                            />
                            <ClassicInput
                                id="lieu"
                                label="Lieu"
                                type="text"
                                required
                            />
                        </fieldset>
                        <fieldset className={styles.fieldset}>
                            <h2>Tarifs</h2>
                            {priceInputs.map((priceInput) => (
                                <div className={styles.inputGroup}>
                                    <PriceInput
                                        key={priceInput.id}
                                        id={`type${priceInput.id}`}
                                        id_price={priceInput.id_price}
                                        label={`Type ${priceInput.id}`}
                                        type="text"
                                        required
                                    />
                                </div>

                            ))}

                            <div className={styles.buttons}>
                                <button type="button" onClick={handleAddPriceInput} disabled={priceInputs.length >= 5}>
                                    Ajouter un tarif +
                                </button>
                                {priceInputs.length > 1 && (
                                    <button type="button" onClick={handleRemoveLastInput}>
                                        Retier un tarif -
                                    </button>
                                )}
                            </div>
                        </fieldset>
                    </div>
                    <div className={styles.fullWidth}>
                        <fieldset className={styles.fieldset}>
                            <h2>Détails de l'événement</h2>
                            <ClassicTextarea></ClassicTextarea>
                        </fieldset>
                    </div>
                </div>
                <input type="submit" name="" id="" />
            </form>
        </div>
    )
}