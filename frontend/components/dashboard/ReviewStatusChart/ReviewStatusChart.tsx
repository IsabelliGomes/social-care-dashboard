"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { REVIEW_COLORS } from "@/lib/constants";
import type { SummaryResponse } from "@/types";
import styles from "./ReviewStatusChart.module.scss";

type ReviewStatusChartProps = {
  summary: SummaryResponse | null;
  loading: boolean;
};

export function ReviewStatusChart({ summary, loading }: ReviewStatusChartProps) {
  const total = summary?.totalChildren ?? 0;
  const reviewed = summary?.reviewedChildren ?? 0;
  const pending = total - reviewed;

  const reviewedPercentage = total > 0 ? Math.round((reviewed / total) * 100) : 0;
  const pendingPercentage = total > 0 ? 100 - reviewedPercentage : 0;

  const data = [
    { name: "Revisados", value: reviewed, color: REVIEW_COLORS.revisados },
    { name: "Pendentes", value: pending, color: REVIEW_COLORS.pendentes },
  ];

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Status de revisão</h2>

      {loading ? (
        <div className={styles.skeleton} aria-busy="true" />
      ) : (
        <div className={styles.body}>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={82}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className={styles.center} aria-label={`${total} crianças no total`}>
              <span className={styles.centerValue}>{total}</span>
              <span className={styles.centerLabel}>total</span>
            </div>
          </div>

          <ul className={styles.legend}>
            <li className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: REVIEW_COLORS.revisados }}
              />
              <div>
                <p className={styles.legendName}>Revisados</p>
                <p className={styles.legendStat}>
                  {reviewed}{" "}
                  <span className={styles.legendPercentage}>({reviewedPercentage}%)</span>
                </p>
              </div>
            </li>
            <li className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: REVIEW_COLORS.pendentes }}
              />
              <div>
                <p className={styles.legendName}>Pendentes</p>
                <p className={styles.legendStat}>
                  {pending}{" "}
                  <span className={styles.legendPercentage}>({pendingPercentage}%)</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
