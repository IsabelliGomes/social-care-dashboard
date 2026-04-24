import styles from "./InputField.module.scss";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}

export const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  placeholder,
  required = false,
}: InputFieldProps) => {
  return (
    <div className={styles["input-field"]}>
      <label htmlFor={id} className={styles["input-field__label"]}>
        {label}
        {required && <span className={styles["input-field__required"]}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          styles["input-field__input"],
          error ? styles["input-field__input--error"] : "",
          disabled ? styles["input-field__input--disabled"] : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {error && (
        <p
          id={`${id}-error`}
          className={styles["input-field__error"]}
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
