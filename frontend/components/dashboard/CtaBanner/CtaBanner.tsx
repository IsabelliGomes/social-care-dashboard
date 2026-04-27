import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import styles from "./CtaBanner.module.scss";

export function CtaBanner() {
  return (
    <aside className={styles.banner} aria-label="Ação rápida">
      <div className={styles.content}>
        <ClipboardList size={28} className={styles.icon} aria-hidden="true" />
        <div>
          <p className={styles.title}>Casos que precisam de atenção</p>
          <p className={styles.description}>
            Veja crianças com alertas ativos e revisões pendentes.
          </p>
        </div>
      </div>

      <Link href="/children" className={styles.button}>
        Ver crianças
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </aside>
  );
}
