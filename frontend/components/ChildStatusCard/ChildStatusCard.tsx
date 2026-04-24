import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import type { Child } from "@/types";
import styles from "./ChildStatusCard.module.scss";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

type ChildStatusCardProps = {
  child: Child;
  onReview: () => void;
  loading: boolean;
};

export function ChildStatusCard({ child, onReview, loading }: ChildStatusCardProps) {
  const disabled = child.revisado || loading;

  return (
    <section className={styles.card} aria-label="Status de revisao">
      <div className={styles.top}>
        <h2 className={styles.title}>Status de Revisão</h2>
        <StatusBadge revisado={child.revisado} />
      </div>

      <p className={styles.description}>
        {child.revisado
          ? `Revisado por ${child.revisado_por}${child.revisado_em ? ` em ${formatDate(child.revisado_em)}` : ""}.`
          : "Este caso ainda não foi revisado."}
      </p>

      <button
        className={styles.reviewButton}
        onClick={onReview}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {loading ? "Salvando..." : "Marcar como revisado"}
      </button>
    </section>
  );
}
