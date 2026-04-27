"use client";

import styles from "./ConfirmationReviewDialog.module.scss";

type ConfirmationReviewDialogProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export function ConfirmationReviewDialog({
  isOpen,
  title = "Confirmar revisão",
  message = "Tem certeza que deseja confirmar a revisão?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationReviewDialogProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel} role="presentation">
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
