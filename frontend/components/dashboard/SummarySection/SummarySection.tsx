import { Users, HeartPulseIcon, GraduationCap, HeartHandshake } from "lucide-react";
import { SummaryCard } from "../SummaryCard/SummaryCard";
import type { SummaryResponse } from "@/types";
import styles from "./SummarySection.module.scss";

type SummarySectionProps = {
  summary: SummaryResponse | null;
  loading: boolean;
};

export function SummarySection({ summary, loading }: SummarySectionProps) {
  return (
    <section aria-label="Resumo geral" className={styles.grid}>
      <SummaryCard
        title="Total de Crianças"
        value={loading ? "—" : summary?.totalChildren ?? 0}
        icon={Users}
        accent="primary"
        description="cadastradas no sistema"
      />
      <SummaryCard
        title="Alertas de Saúde"
        value={loading ? "—" : summary?.alertsByArea.saude ?? 0}
        icon={HeartPulseIcon}
        accent="alert"
        description="crianças com alerta"
      />
      <SummaryCard
        title="Alertas de Educação"
        value={loading ? "—" : summary?.alertsByArea.educacao ?? 0}
        icon={GraduationCap}
        accent="attention"
        description="crianças com alerta"
      />
      <SummaryCard
        title="Alertas de Assistência"
        value={loading ? "—" : summary?.alertsByArea.assistenciaSocial ?? 0}
        icon={HeartHandshake}
        accent="info"
        description="crianças com alerta"
      />
    </section>
  );
}
