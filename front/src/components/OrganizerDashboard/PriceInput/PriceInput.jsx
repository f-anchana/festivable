import formStyles from "./PriceInput.module.scss";

export default function PriceInput({
  id,
  label,
  required = false,
  placeholder = " ",
  value,
  onChange,
  id_price
}) {
  return (
    <div className={formStyles.inputContainer}>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />

      <label htmlFor={id_price}>
        Prix
      </label>
      <input
        type="number"
        id={id_price}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
