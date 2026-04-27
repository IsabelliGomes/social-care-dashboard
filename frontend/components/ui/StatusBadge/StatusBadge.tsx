import { Check, Clock } from "lucide-react";
import styles from "./StatusBadge.module.scss";

type StatusBadgeProps = {
  revisado: boolean;
};

export function StatusBadge({ revisado }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${revisado ? styles.revisado : styles.pendente}`}>
      {revisado ? (
        <Check size={12} aria-hidden="true" />
      ) : (
        <Clock size={12} aria-hidden="true" />
      )}
      {revisado ? "Revisado" : "Pendente"}
    </span>
  );
}
