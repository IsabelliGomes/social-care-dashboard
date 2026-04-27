import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChildrenTable } from "./ChildrenTable";
import type { Child } from "@/types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/components/ui", () => ({
  AlertBadge: ({ area }: any) => <span>{area}</span>,
}));

const mockChild: Child = {
  id: "1",
  nome: "Maria Silva",
  data_nascimento: "2015-01-01",
  bairro: "Centro",
  responsavel: "Ana Silva",
  saude: { alertas: ["Acompanhamento pendente"], ultima_consulta: "2024-02-10", vacinas_em_dia: false },
  educacao: null,
  assistencia_social: null,
  revisado: false,
  revisado_por: null,
  revisado_em: null,
};

describe("ChildrenTable", () => {
  const mockOnReview = jest.fn();

  beforeEach(() => {
    mockOnReview.mockClear();
  });

  test("renders table with columns", () => {
    render(<ChildrenTable children={[mockChild]} onReview={mockOnReview} reviewingId={null} />);
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Bairro")).toBeInTheDocument();
    expect(screen.getByText("Alertas")).toBeInTheDocument();
  });

  test("renders child data", () => {
    render(<ChildrenTable children={[mockChild]} onReview={mockOnReview} reviewingId={null} />);
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });

  test("renders review button for non-reviewed children", () => {
    render(<ChildrenTable children={[mockChild]} onReview={mockOnReview} reviewingId={null} />);
    expect(screen.getByRole("button", { name: /Revisar Maria Silva/ })).toBeInTheDocument();
  });

  test("renders reviewed state when child is reviewed", () => {
    const reviewedChild = { ...mockChild, revisado: true };
    render(<ChildrenTable children={[reviewedChild]} onReview={mockOnReview} reviewingId={null} />);
    expect(screen.getByText("Revisado")).toBeInTheDocument();
  });

  test("opens confirmation dialog when review button is clicked", async () => {
    render(<ChildrenTable children={[mockChild]} onReview={mockOnReview} reviewingId={null} />);
    await userEvent.click(screen.getByRole("button", { name: /Revisar Maria Silva/ }));
    // Dialog will appear after click
    expect(screen.getByText(/Deseja registrar/)).toBeInTheDocument();
  });

  test("renders loading state when reviewing", () => {
    render(<ChildrenTable children={[mockChild]} onReview={mockOnReview} reviewingId="1" />);
    expect(screen.getByText("Salvando...")).toBeInTheDocument();
  });

  test("shows empty alerts indicator when no alerts", () => {
    const childNoAlerts = { ...mockChild, saude: null, educacao: null, assistencia_social: null };
    render(<ChildrenTable children={[childNoAlerts]} onReview={mockOnReview} reviewingId={null} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
