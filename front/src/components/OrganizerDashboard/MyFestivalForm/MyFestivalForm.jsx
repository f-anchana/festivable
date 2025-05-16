import ClassicInput from "@/components/OrganizerDashboard/ClassicInput/ClassicInput";
import PriceInput from "@components/PriceInput/PriceInput";

export default function MyFestivalForm() {
    return (
        <div>
            <form action="">
                <fieldset>
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
                <fieldset>
                    <h2>Tarifs</h2>
                    <PriceInput
                        id="price"
                        id_price="price"
                        label="Lieu"
                        type="text"
                        required
                    />
                </fieldset>
            </form>
        </div>
    )
}