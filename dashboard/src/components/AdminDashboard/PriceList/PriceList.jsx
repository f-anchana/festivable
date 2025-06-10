import styles from "./PriceList.module.scss";

export default function PriceList({ prices }) {
    if (!prices || prices.length === 0) {
        return <p>Aucun tarif renseigné</p>;
    }

    return (
        <div className={styles.container}>
            <h3>Tarifs</h3>
            <ul>
                {prices.map((price) => (
                    <li key={price._id}>
                        {price.type} : {price.amount} €
                    </li>
                ))}
            </ul>
        </div>

    );
}