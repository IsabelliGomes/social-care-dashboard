import { ElementType } from "react";
import styles from "./SummaryCard.module.scss";

type SummaryCardProps = {
  title: string;
  value: number | string;
  icon: ElementType;
  accent?: "primary" | "alert" | "attention" | "info" | "success";
  description?: string;
};

export function SummaryCard({
  title,
  value,
  icon: Icon,
  accent = "primary",
  description,
}: SummaryCardProps) {
  return (
    <article className={`${styles.card} ${styles[`accent-${accent}`]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={`${styles.iconWrapper} ${styles[`icon-${accent}`]}`}>
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className={styles.value}>{value}</p>
      {description && <p className={styles.description}>{description}</p>}
    </article>
  );
}
