import { AlertsByAreaChart } from "../AlertsByAreaChart/AlertsByAreaChart";
import { ReviewStatusChart } from "../ReviewStatusChart/ReviewStatusChart";
import type { SummaryResponse } from "@/types";
import styles from "./ChartsSection.module.scss";

type ChartsSectionProps = {
  summary: SummaryResponse | null;
  loading: boolean;
};

export function ChartsSection({ summary, loading }: ChartsSectionProps) {
  return (
    <section aria-label="Gráficos" className={styles.grid}>
      <AlertsByAreaChart />
      <ReviewStatusChart summary={summary} loading={loading} />
    </section>
  );
}
