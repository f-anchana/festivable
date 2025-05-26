import style from "@/styles/OrganizerDashboard.module.scss";

export default function PriceInput({
  id,
  label,
  required = false,
  placeholderType = " ",
  placeholderPrice = " ",
  valueType,
  valueAmmount,
  onChangeType,
  onChangeAmount,
  id_price
}) {
  return (
    <div className={`${style.inputContainer} ${style.priceContainer}`}>
      <div className={style.type}>
        <label htmlFor={id}>
          {label}
        </label>
        <input
          type="text"
          id={id}
          placeholder={placeholderType}
          required={required}
          value={valueType}
          onChange={onChangeType}
        />
      </div>

      <div className={style.price}>
        <label htmlFor={id_price}>
          Prix
        </label>
        <input
          type="number"
          id={id_price}
          placeholder={placeholderPrice}
          required={required}
          value={valueAmmount}
          onChange={onChangeAmount}
        />
      </div>

    </div>
  );
}
