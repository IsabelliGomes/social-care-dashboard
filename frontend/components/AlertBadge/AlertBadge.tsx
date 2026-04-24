import styles from "./AlertBadge.module.scss";

type AlertArea = "saude" | "educacao" | "assistenciaSocial";

const LABELS: Record<AlertArea, string> = {
  saude: "Saúde",
  educacao: "Educação",
  assistenciaSocial: "Assistência",
};

type AlertBadgeProps = {
  area: AlertArea;
};

export function AlertBadge({ area }: AlertBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[area]}`}>
      {LABELS[area]}
    </span>
  );
}
