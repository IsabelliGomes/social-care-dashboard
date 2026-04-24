import styles from "./ChildFilters.module.scss";

export type Filters = {
  bairro: string;
  comAlertas: string;
  revisado: string;
};

type ChildFiltersProps = {
  filters: Filters;
  bairros: string[];
  onChange: (filters: Filters) => void;
  onClear: () => void;
};

export function ChildFilters({
  filters,
  bairros,
  onChange,
  onClear,
}: ChildFiltersProps) {
  const activeCount = [filters.bairro, filters.comAlertas, filters.revisado].filter(
    (v) => v !== ""
  ).length;

  function handleChange(field: keyof Filters, value: string) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.selects}>
        <label className={styles.field}>
          <span className={styles.label}>Bairro</span>
          <select
            className={styles.select}
            value={filters.bairro}
            onChange={(e) => handleChange("bairro", e.target.value)}
            aria-label="Filtrar por bairro"
          >
            <option value="">Todos os bairros</option>
            {bairros.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Alertas</span>
          <select
            className={styles.select}
            value={filters.comAlertas}
            onChange={(e) => handleChange("comAlertas", e.target.value)}
            aria-label="Filtrar por alertas"
          >
            <option value="">Todos</option>
            <option value="true">Com alertas</option>
            <option value="false">Sem alertas</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Revisado</span>
          <select
            className={styles.select}
            value={filters.revisado}
            onChange={(e) => handleChange("revisado", e.target.value)}
            aria-label="Filtrar por status de revisão"
          >
            <option value="">Todos</option>
            <option value="true">Revisado</option>
            <option value="false">Pendente</option>
          </select>
        </label>
      </div>

      <button
        className={styles.clearButton}
        onClick={onClear}
        disabled={activeCount === 0}
        aria-label="Limpar filtros"
      >
        Limpar filtros
        {activeCount > 0 && (
          <span className={styles.badge}>{activeCount}</span>
        )}
      </button>
    </div>
  );
}
