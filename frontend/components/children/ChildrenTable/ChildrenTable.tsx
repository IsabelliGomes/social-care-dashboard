import { Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertBadge } from "@/components/ui";
import { ConfirmationReviewDialog } from "../ConfirmationReviewDialog/ConfirmationReviewDialog";
import { routes } from "@/lib/routes";
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
  onReview: (id: string) => void;
  reviewingId: string | null;
};

export function ChildrenTable({ children, onReview, reviewingId }: ChildrenTableProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  function handleRowClick(childId: string, e: React.MouseEvent) {
    // Don't navigate if clicking the button
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    router.push(routes.childDetail(childId));
  }

  function handleReviewClick(childId: string) {
    setSelectedChildId(childId);
    setDialogOpen(true);
  }

  function handleConfirmReview() {
    if (selectedChildId) {
      onReview(selectedChildId);
      setDialogOpen(false);
      setSelectedChildId(null);
    }
  }

  function handleCancelReview() {
    setDialogOpen(false);
    setSelectedChildId(null);
  }

  const selectedChild = children.find((c) => c.id === selectedChildId);

  return (
    <>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Bairro</th>
              <th className={styles.th}>Alertas</th>
              <th className={styles.th}>Revisar</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => {
              const areas = getAlertAreas(child);
              const isReviewing = reviewingId === child.id;
              return (
                <tr
                  key={child.id}
                  className={styles.row}
                  onClick={(e) => handleRowClick(child.id, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRowClick(child.id, e as any);
                  }}
                  role="button"
                  tabIndex={0}
                >
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
                  <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                    <button
                      className={`${styles.reviewButton} ${child.revisado ? styles.reviewed : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReviewClick(child.id);
                      }}
                      disabled={child.revisado || isReviewing}
                      aria-label={`${child.revisado ? "Já revisado" : "Revisar"} ${child.nome}`}
                    >
                      {child.revisado ? (
                        <>
                          <Check size={14} aria-hidden="true" />
                          Revisado
                        </>
                      ) : isReviewing ? (
                        "Salvando..."
                      ) : (
                        "Revisar"
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmationReviewDialog
        isOpen={dialogOpen}
        message={`Deseja registrar que o caso de ${selectedChild?.nome} foi revisado?`}
        onConfirm={handleConfirmReview}
        onCancel={handleCancelReview}
        isLoading={reviewingId === selectedChildId}
      />
    </>
  );
}
