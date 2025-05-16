import formStyles from "./PriceInput.module.scss";

export default function PriceInput({
  id,
  label,
  required = false,
  placeholder = " ",
  value,
  onChange,
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
      <input
        type="number"
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
