import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AlertBadge } from "@/components/ui";
import { StatusBadge } from "@/components/ui";
import { routes } from "@/lib/routes";
import type { Child } from "@/types";
import styles from "./ChildrenCards.module.scss";

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

type ChildrenCardsProps = {
  children: Child[];
};

export function ChildrenCards({ children }: ChildrenCardsProps) {
  return (
    <ul className={styles.list}>
      {children.map((child) => {
        const areas = getAlertAreas(child);
        return (
          <li key={child.id}>
          <Link href={routes.childDetail(child.id)} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.avatar} aria-hidden="true">
                {child.nome.charAt(0)}
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{child.nome}</p>
                <p className={styles.sub}>{child.bairro} · {formatDate(child.data_nascimento)}</p>
              </div>
              <ChevronRight size={18} className={styles.chevron} aria-hidden="true" />
            </div>

            <div className={styles.footer}>
              <div className={styles.badges}>
                {areas.length > 0
                  ? areas.map((area) => <AlertBadge key={area} area={area} />)
                  : <span className={styles.noAlerts}>—</span>}
              </div>
              <StatusBadge revisado={child.revisado} />
            </div>
          </Link>
          </li>
        );
      })}
    </ul>
  );
}
