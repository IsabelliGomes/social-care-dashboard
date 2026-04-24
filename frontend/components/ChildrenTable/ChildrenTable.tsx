import { ChevronRight } from "lucide-react";
import { AlertBadge } from "@/components/AlertBadge/AlertBadge";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import type { Child } from "@/types";
import styles from "./ChildrenTable.module.scss";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function getAlertAreas(child: Child) {
  const areas: ("saude" | "educacao" | "assistenciaSocial")[] = [];
  if (child.saude?.alertas?.length) areas.push("saude");
  if (child.educacao?.alertas?.length) areas.push("educacao");
  if (child.assistencia_social?.alertas?.length) areas.push("assistenciaSocial");
  return areas;
}

type ChildrenTableProps = {
  children: Child[];
};

export function ChildrenTable({ children }: ChildrenTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Nome</th>
            <th className={styles.th}>Bairro</th>
            <th className={styles.th}>Alertas</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child) => {
            const areas = getAlertAreas(child);
            return (
              <tr key={child.id} className={styles.row}>
                <td className={styles.td}>
                  <div className={styles.nameCell}>
                    <div className={styles.avatar} aria-hidden="true">
                      {child.nome.charAt(0)}
                    </div>
                    <div>
                      <p className={styles.name}>{child.nome}</p>
                      <p className={styles.birthdate}>
                        {formatDate(child.data_nascimento)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className={styles.td}>{child.bairro}</td>
                <td className={styles.td}>
                  <div className={styles.badges}>
                    {areas.length > 0
                      ? areas.map((area) => (
                          <AlertBadge key={area} area={area} />
                        ))
                      : <span className={styles.noAlerts}>—</span>}
                  </div>
                </td>
                <td className={styles.td}>
                  <StatusBadge revisado={child.revisado} />
                </td>
                <td className={styles.td}>
                  <button className={styles.detailsButton} aria-label={`Ver detalhes de ${child.nome}`}>
                    Ver detalhes
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
