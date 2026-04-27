"use client";
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
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>
        <span className={`${styles.iconWrapper} ${styles[`icon-${accent}`]}`}>
          <Icon size={30} aria-hidden="true" />
        </span>
        <div className={styles.details}>
          <p className={styles.value}>{value}</p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    </article>
  );
}
