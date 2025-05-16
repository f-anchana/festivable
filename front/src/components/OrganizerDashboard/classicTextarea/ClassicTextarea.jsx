import formStyles from "@/styles/OrganizerDashboard.module.scss";

export default function ClassicTextarea({
    id,
    label,
    required = false,
    placeholder = " ",
    value,
    onChange,
}) {
    return (
        <div className={formStyles.textareaContainer}>
            <label htmlFor={id}>
                {label}
            </label>
            <textarea
                id={id}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                rows="10"
            />
        </div>
    );
}
