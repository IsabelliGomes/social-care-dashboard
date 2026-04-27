import { render, screen, fireEvent } from "@testing-library/react";
import type { Child } from "@/types";
import { ChildrenTable } from "./ChildrenTable";

jest.mock("@/components/AlertBadge/AlertBadge", () => ({
  AlertBadge: ({ area }: { area: string }) => <span>{area}</span>,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const children: Child[] = [
  {
    id: "1",
    nome: "Maria Silva",
    data_nascimento: "2016-02-10",
    bairro: "Centro",
    responsavel: "Ana Silva",
    saude: { alertas: ["x"] },
    educacao: { alertas: ["y"] },
    assistencia_social: null,
    revisado: false,
    revisado_por: null,
    revisado_em: null,
  },
];

describe("ChildrenTable", () => {
  test("renders child information and review button", () => {
    const onReview = jest.fn();
    render(<ChildrenTable children={children} onReview={onReview} reviewingId={null} />);

    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
    expect(screen.getByText("09/02/2016")).toBeInTheDocument();
    expect(screen.getByText("saude")).toBeInTheDocument();
    expect(screen.getByText("educacao")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /revisar maria silva/i })).toBeInTheDocument();
  });

  test("calls onReview when review button is clicked", () => {
    const onReview = jest.fn();
    render(<ChildrenTable children={children} onReview={onReview} reviewingId={null} />);
    
    fireEvent.click(screen.getByRole("button", { name: /revisar maria silva/i }));
    expect(onReview).toHaveBeenCalledWith("1");
  });

  test("disables review button when already reviewed", () => {
    const onReview = jest.fn();
    const reviewed: Child[] = [{ ...children[0], revisado: true, revisado_por: "x" }];
    render(<ChildrenTable children={reviewed} onReview={onReview} reviewingId={null} />);

    const button = screen.getByRole("button", { name: /já revisado/i });
    expect(button).toBeDisabled();
  });

  test("shows loading state when reviewing", () => {
    const onReview = jest.fn();
    render(<ChildrenTable children={children} onReview={onReview} reviewingId="1" />);

    expect(screen.getByText("Salvando...")).toBeInTheDocument();
  });
});
