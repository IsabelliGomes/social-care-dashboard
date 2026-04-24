import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  variant = "primary",
  fullWidth = false,
  className = "",
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const variantClass =
    variant === "primary"
      ? styles["button--primary"]
      : styles["button--secondary"];
  const disabledClass = isDisabled ? styles["button--disabled"] : "";
  const widthClass = fullWidth ? styles["button--fullWidth"] : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={[styles.button, variantClass, widthClass, disabledClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? "Autenticando..." : children}
    </button>
  );
};
