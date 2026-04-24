"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar/TopBar";
import { SummarySection } from "@/components/SummarySection/SummarySection";
import { ChartsSection } from "@/components/ChartsSection/ChartsSection";
import { getSummary } from "@/lib/api";
import type { SummaryResponse } from "@/types";
import styles from "./page.module.scss";

export default function DashboardPage() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSummary()
      .then(setSummary)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <TopBar />
      <main className={styles.content}>
        {error && (
          <p className={styles.errorMessage} role="alert">
            Não foi possível carregar os dados. Verifique sua conexão.
          </p>
        )}

        <SummarySection summary={summary} loading={loading} />
        <ChartsSection summary={summary} loading={loading} />
      </main>
    </>
  );
}
