"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TopBar } from "@/components/layout";
import { ChildFilters, type Filters, ChildrenTable, ChildrenCards } from "@/components/children";
import { Pagination } from "@/components/ui";
import { getChildren, reviewChild } from "@/lib/api";
import type { Child, ListChildrenResponse } from "@/types";
import styles from "./page.module.scss";

const EMPTY_FILTERS: Filters = { bairro: "", comAlertas: "", revisado: "" };
const PAGE_SIZE = 5;

export default function ChildrenPage() {
  const [data, setData] = useState<ListChildrenResponse | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  const fetchChildren = useCallback(async (p: number, f: Filters) => {
    setLoading(true);
    setError(false);
    try {
      const result = await getChildren(p, PAGE_SIZE, {
        bairro: f.bairro || undefined,
        comAlertas: f.comAlertas || undefined,
        revisado: f.revisado || undefined,
      });
      setData(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChildren(page, filters);
  }, [page, filters, fetchChildren]);

  function handleFiltersChange(next: Filters) {
    setFilters(next);
    setPage(1);
  }

  function handleClear() {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  }

  async function handleReview(childId: string) {
    setReviewingId(childId);
    try {
      await reviewChild(childId);
      if (data) {
        setData({
          ...data,
          items: data.items.map((child) =>
            child.id === childId
              ? { ...child, revisado: true, revisado_em: new Date().toISOString() }
              : child
          ),
        });
      }
    } catch {
      // error handled silently or could show toast notification
    } finally {
      setReviewingId(null);
    }
  }

  const bairros = useMemo<string[]>(() => {
    if (!data) return [];
    return [...new Set(data.items.map((c: Child) => c.bairro))].sort((a, b) =>
      a.localeCompare(b, "pt-BR")
    );
  }, [data]);

  const items = data?.items ?? [];
  const pagination = data?.pagination;

  return (
    <>
      <TopBar />
      <main className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Crianças</h1>
          <p className={styles.subtitle}>Busque e filtre as crianças acompanhadas.</p>
        </header>

        <ChildFilters
          filters={filters}
          bairros={bairros}
          onChange={handleFiltersChange}
          onClear={handleClear}
        />

        {error && (
          <p className={styles.error} role="alert">
            Não foi possível carregar os dados. Verifique sua conexão.
          </p>
        )}

        {loading ? (
          <div className={styles.skeleton} aria-busy="true" />
        ) : (
          <>
            <ChildrenTable children={items} onReview={handleReview} reviewingId={reviewingId} />
            <ChildrenCards children={items} />
          </>
        )}

        {!loading && pagination && pagination.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </main>
    </>
  );
}
