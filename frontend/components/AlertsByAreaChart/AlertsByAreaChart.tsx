"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getChildren } from "@/lib/api";
import { AREA_COLORS } from "@/lib/constants";
import type { Child } from "@/types";
import styles from "./AlertsByAreaChart.module.scss";

type NeighborhoodData = {
  bairro: string;
  Saúde: number;
  Educação: number;
  Assistência: number;
};

function hasAlerts(field: Child["saude"]): boolean {
  return Array.isArray(field?.alertas) && field.alertas.length > 0;
}

function aggregateByNeighborhood(children: Child[]): NeighborhoodData[] {
  const map = new Map<string, NeighborhoodData>();

  for (const child of children) {
    const bairro = child.bairro || "Outros";
    if (!map.has(bairro)) {
      map.set(bairro, { bairro, Saúde: 0, Educação: 0, Assistência: 0 });
    }
    const entry = map.get(bairro)!;
    if (hasAlerts(child.saude)) entry["Saúde"]++;
    if (hasAlerts(child.educacao)) entry["Educação"]++;
    if (hasAlerts(child.assistencia_social)) entry["Assistência"]++;
  }

  return Array.from(map.values()).sort((a, b) =>
    a.bairro.localeCompare(b.bairro, "pt-BR")
  );
}

export function AlertsByAreaChart() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBairro, setSelectedBairro] = useState<string>("Todos");

  useEffect(() => {
    getChildren()
      .then((res) => setChildren(res.items))
      .finally(() => setLoading(false));
  }, []);

  const allData = useMemo(
    () => aggregateByNeighborhood(children),
    [children]
  );

  const bairros = useMemo(
    () => ["Todos", ...allData.map((d) => d.bairro)],
    [allData]
  );

  const chartData = useMemo(
    () =>
      selectedBairro === "Todos"
        ? allData
        : allData.filter((d) => d.bairro === selectedBairro),
    [allData, selectedBairro]
  );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Visão geral de alertas por área</h2>
        <select
          className={styles.filter}
          value={selectedBairro}
          onChange={(e) => setSelectedBairro(e.target.value)}
          aria-label="Filtrar por bairro"
        >
          {bairros.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className={styles.skeleton} aria-busy="true" />
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="bairro"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                fontSize: "0.8125rem",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "0.8125rem" }}
            />
            <Bar dataKey="Saúde" fill={AREA_COLORS.saude} radius={[3, 3, 0, 0]} />
            <Bar dataKey="Educação" fill={AREA_COLORS.educacao} radius={[3, 3, 0, 0]} />
            <Bar dataKey="Assistência" fill={AREA_COLORS.assistenciaSocial} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}

      <a href="/children" className={styles.link}>
        Ver relatório completo →
      </a>
    </div>
  );
}
