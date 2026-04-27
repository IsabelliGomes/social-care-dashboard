import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.wrapper}>
      <p className={styles.summary}>
        Mostrando {from} a {to} de {total} crianças
      </p>

      <nav className={styles.nav} aria-label="Paginação">
        <button
          className={styles.navButton}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Anterior
        </button>

        <div className={styles.pages}>
          {pages.map((p) => (
            <button
              key={p}
              className={`${styles.pageButton} ${p === page ? styles.pageButtonActive : ""}`}
              onClick={() => onPageChange(p)}
              aria-label={`Página ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          className={styles.navButton}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Próxima página"
        >
          Próximo
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
