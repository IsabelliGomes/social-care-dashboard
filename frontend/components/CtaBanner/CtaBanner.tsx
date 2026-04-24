import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import styles from "./CtaBanner.module.scss";

export function CtaBanner() {
  return (
    <aside className={styles.banner} aria-label="Ação rápida">
      <div className={styles.content}>
        <ClipboardList size={28} className={styles.icon} aria-hidden="true" />
        <div>
          <p className={styles.title}>Acompanhe e faça a diferença</p>
          <p className={styles.description}>
            Acesse a lista completa de crianças e registre as revisões em aberto para ajudar a garantir os diretos das crianças.
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
