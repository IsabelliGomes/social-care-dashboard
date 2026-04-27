import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChildStatusCard } from "./ChildStatusCard";
import type { Child } from "@/types";

jest.mock("@/components/ui", () => ({
  StatusBadge: ({ revisado }: any) => <span>{revisado ? "Revisado" : "Pendente"}</span>,
}));

const mockChild: Child = {
  id: "1",
  nome: "Maria Silva",
  data_nascimento: "2015-01-01",
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
  const mockOnReview = jest.fn();

  beforeEach(() => {
    mockOnReview.mockClear();
  });

  test("renders status section", () => {
    render(<ChildStatusCard child={mockChild} onReview={mockOnReview} loading={false} />);
    expect(screen.getByText("Status de Revisão")).toBeInTheDocument();
  });

  test("renders pending status badge", () => {
    render(<ChildStatusCard child={mockChild} onReview={mockOnReview} loading={false} />);
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });

  test("shows message when case is not reviewed", () => {
    render(<ChildStatusCard child={mockChild} onReview={mockOnReview} loading={false} />);
    expect(screen.getByText("Este caso ainda não foi revisado.")).toBeInTheDocument();
  });

  test("renders review button", () => {
    render(<ChildStatusCard child={mockChild} onReview={mockOnReview} loading={false} />);
    expect(screen.getByRole("button", { name: /Marcar como revisado/ })).toBeInTheDocument();
  });

  test("opens dialog when review button is clicked", async () => {
    render(<ChildStatusCard child={mockChild} onReview={mockOnReview} loading={false} />);
    await userEvent.click(screen.getByRole("button", { name: /Marcar como revisado/ }));
    expect(screen.getByText(/Deseja registrar/)).toBeInTheDocument();
  });

  test("shows reviewed status when revisado is true", () => {
    const reviewedChild = { ...mockChild, revisado: true, revisado_por: "João", revisado_em: "2024-01-15" };
    render(<ChildStatusCard child={reviewedChild} onReview={mockOnReview} loading={false} />);
    expect(screen.getByText(/Revisado por João/)).toBeInTheDocument();
  });

  test("disables review button when loading", () => {
    render(<ChildStatusCard child={mockChild} onReview={mockOnReview} loading={true} />);
    expect(screen.getByRole("button", { name: /Salvando/ })).toBeDisabled();
  });

  test("disables review button when already reviewed", () => {
    const reviewedChild = { ...mockChild, revisado: true };
    render(<ChildStatusCard child={reviewedChild} onReview={mockOnReview} loading={false} />);
    expect(screen.getByRole("button", { name: /Marcar como revisado/ })).toBeDisabled();
  });

  test("shows saving status when loading", () => {
    render(<ChildStatusCard child={mockChild} onReview={mockOnReview} loading={true} />);
    expect(screen.getByText("Salvando...")).toBeInTheDocument();
  });
});
