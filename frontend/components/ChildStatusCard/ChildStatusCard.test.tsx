import { render, screen, fireEvent } from "@testing-library/react";
import { ChildStatusCard } from "./ChildStatusCard";
import type { Child } from "@/types";

jest.mock("@/components/StatusBadge/StatusBadge", () => ({
  StatusBadge: ({ revisado }: { revisado: boolean }) => (
    <span>{revisado ? "Revisado" : "Pendente"}</span>
  ),
}));

jest.mock("@/components/ConfirmationReviewDialog/ConfirmationReviewDialog", () => ({
  ConfirmationReviewDialog: ({ isOpen, onConfirm, onCancel }: any) => (
    isOpen ? (
      <div>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    ) : null
  ),
}));

const baseChild: Child = {
  id: "1",
  nome: "Maria Silva",
  data_nascimento: "2010-06-15",
  bairro: "Centro",
  responsavel: "Ana Silva",
  saude: null,
  educacao: null,
  assistencia_social: null,
  revisado: false,
  revisado_por: null,
  revisado_em: null,
};

describe("ChildStatusCard", () => {
  test("shows pending description when not revisado", () => {
    render(<ChildStatusCard child={baseChild} onReview={jest.fn()} loading={false} />);
    expect(screen.getByText(/ainda não foi revisado/i)).toBeInTheDocument();
  });

  test("shows revisado description when revisado", () => {
    const child: Child = {
      ...baseChild,
      revisado: true,
      revisado_por: "tecnico@prefeitura.rio",
      revisado_em: "2024-03-10T10:00:00Z",
    };
    render(<ChildStatusCard child={child} onReview={jest.fn()} loading={false} />);
    expect(screen.getByText(/revisado por/i)).toBeInTheDocument();
  });

  test("review button is enabled when not revisado", () => {
    render(<ChildStatusCard child={baseChild} onReview={jest.fn()} loading={false} />);
    const btn = screen.getByRole("button", { name: /marcar como revisado/i });
    expect(btn).not.toBeDisabled();
  });

  test("review button is disabled when already revisado", () => {
    const child: Child = { ...baseChild, revisado: true, revisado_por: "x", revisado_em: null };
    render(<ChildStatusCard child={child} onReview={jest.fn()} loading={false} />);
    expect(screen.getByRole("button", { name: /marcar como revisado/i })).toBeDisabled();
  });

  test("review button is disabled when loading", () => {
    render(<ChildStatusCard child={baseChild} onReview={jest.fn()} loading={true} />);
    expect(screen.getByRole("button", { name: /salvando/i })).toBeDisabled();
  });

  test("opens confirmation dialog when review button is clicked", () => {
    render(<ChildStatusCard child={baseChild} onReview={jest.fn()} loading={false} />);
    fireEvent.click(screen.getByRole("button", { name: /marcar como revisado/i }));
    expect(screen.getByText("Confirmar")).toBeInTheDocument();
  });

  test("calls onReview when confirmation is confirmed", () => {
    const onReview = jest.fn();
    render(<ChildStatusCard child={baseChild} onReview={onReview} loading={false} />);
    
    fireEvent.click(screen.getByRole("button", { name: /marcar como revisado/i }));
    fireEvent.click(screen.getByText("Confirmar"));
    
    expect(onReview).toHaveBeenCalledTimes(1);
  });
});
