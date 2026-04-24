import { Heart, GraduationCap, HandHeart } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./AreaCard.module.scss";

type Area = "saude" | "educacao" | "assistenciaSocial";

type AreaData = {
  [key: string]: string | number | boolean | string[] | undefined;
  alertas?: string[];
};

const AREA_CONFIG: Record<
  Area,
  {
    label: string;
    icon: ReactNode;
    alertLabel: string;
    alertClass: string;
    infoFields: string[];
  }
> = {
  saude: {
    label: "Saúde",
    icon: <Heart size={18} aria-hidden="true" />,
    alertLabel: "Alerta",
    alertClass: styles.badgeSaude,
    infoFields: ["ultima_consulta", "vacinas_em_dia"],
  },
  educacao: {
    label: "Educação",
    icon: <GraduationCap size={18} aria-hidden="true" />,
    alertLabel: "Atenção",
    alertClass: styles.badgeEducacao,
    infoFields: ["escola", "frequencia_percent"],
  },
  assistenciaSocial: {
    label: "Assistência Social",
    icon: <HandHeart size={18} aria-hidden="true" />,
    alertLabel: "Atenção",
    alertClass: styles.badgeAssistencia,
    infoFields: ["cad_unico", "beneficio_ativo"],
  },
};

const FIELD_LABELS: Record<string, string> = {
  ultima_consulta: "Última consulta",
  vacinas_em_dia: "Vacinas em dia",
  escola: "Escola",
  frequencia_percent: "Frequência",
  cad_unico: "Cadastro único",
  beneficio_ativo: "Benefício ativo",
};

function formatValue(key: string, value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (key === "ultima_consulta") {
    return new Date(value as string).toLocaleDateString("pt-BR");
  }
  if (key === "vacinas_em_dia" || key === "cad_unico" || key === "beneficio_ativo") {
    return value ? "Sim" : "Não";
  }
  if (key === "frequencia_percent") {
    return `${value}%`;
  }
  return String(value);
}

type AreaCardProps = {
  area: Area;
  data: AreaData | null;
};

export function AreaCard({ area, data }: AreaCardProps) {
  const config = AREA_CONFIG[area];
  const alertas = data?.alertas ?? [];
  const hasAlerts = alertas.length > 0;

  const infoEntries = config.infoFields
    .map((field) => ({
      field,
      value: data?.[field],
    }))
    .filter(({ value }) => value !== null && value !== undefined);

  return (
    <section className={styles.card} aria-label={config.label}>
      <div className={styles.header}>
        <span className={styles.iconWrapper}>{config.icon}</span>
        <h3 className={styles.title}>{config.label}</h3>
        {hasAlerts ? (
          <span className={`${styles.badge} ${config.alertClass}`}>
            {config.alertLabel}
          </span>
        ) : (
          <span className={`${styles.badge} ${styles.badgeNone}`}>
            Sem dados
          </span>
        )}
      </div>

      {infoEntries.length > 0 && (
        <div className={styles.info}>
          {infoEntries.map(({ field, value }) => (
            <div key={field} className={styles.infoRow}>
              <dt className={styles.infoLabel}>{FIELD_LABELS[field]}</dt>
              <dd className={styles.infoValue}>{formatValue(field, value)}</dd>
            </div>
          ))}
        </div>
      )}

      {hasAlerts ? (
        <ul className={styles.alertList}>
          {alertas.map((alerta, i) => (
            <li key={i} className={styles.alertItem}>
              {alerta}
            </li>
          ))}
        </ul>
      ) : infoEntries.length === 0 ? (
        <p className={styles.empty}>Nenhum dado disponível.</p>
      ) : null}
    </section>
  );
}
