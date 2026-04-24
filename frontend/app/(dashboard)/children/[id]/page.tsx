"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TopBar } from "@/components/TopBar/TopBar";
import { ChildDetailHeader } from "@/components/ChildDetailHeader/ChildDetailHeader";
import { AreaCard } from "@/components/AreaCard/AreaCard";
import { ChildStatusCard } from "@/components/ChildStatusCard/ChildStatusCard";
import { getChildById, reviewChild } from "@/lib/api";
import type { Child } from "@/types";
import styles from "./page.module.scss";

export default function ChildDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  const fetchChild = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getChildById(id);
      setChild(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchChild();
  }, [fetchChild]);

  async function handleReview() {
    if (!child || child.revisado) return;
    setReviewing(true);
    try {
      const updated = await reviewChild(id);
      setChild(updated);
    } catch {
      // keep current state on failure
    } finally {
      setReviewing(false);
    }
  }

  return (
    <>
      <TopBar />
      <main className={styles.content}>
        {loading && (
          <div className={styles.skeleton} aria-busy="true" />
        )}

        {error && !loading && (
          <p className={styles.error} role="alert">
            Não foi possível carregar os dados da criança. Tente novamente.
          </p>
        )}

        {!loading && !error && child && (
          <>
            <ChildDetailHeader child={child} />

            <div className={styles.areasGrid}>
              <AreaCard area="saude" data={child.saude} />
              <AreaCard area="educacao" data={child.educacao} />
              <AreaCard area="assistenciaSocial" data={child.assistencia_social} />
            </div>

            <div className={styles.statusWrapper}>
              <ChildStatusCard
                child={child}
                onReview={handleReview}
                loading={reviewing}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}
