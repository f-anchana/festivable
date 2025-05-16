import ClassicInput from "@/components/OrganizerDashboard/ClassicInput/ClassicInput";

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
            </form>
        </div>
    )
}