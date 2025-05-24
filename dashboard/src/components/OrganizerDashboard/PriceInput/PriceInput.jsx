import style from "@/styles/OrganizerDashboard.module.scss";

export default function PriceInput({
  id,
  label,
  required = false,
  placeholderType = " ",
  placeholderPrice = " ",
  value,
  onChange,
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
          value={value}
          onChange={onChange}
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
          value={value}
          onChange={onChange}
        />
      </div>

    </div>
  );
}
