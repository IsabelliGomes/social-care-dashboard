import { render, screen } from "@testing-library/react";
import type { Child } from "@/types";
import { ChildrenTable } from "./ChildrenTable";

jest.mock("@/components/AlertBadge/AlertBadge", () => ({
  AlertBadge: ({ area }: { area: string }) => <span>{area}</span>,
}));

jest.mock("@/components/StatusBadge/StatusBadge", () => ({
  StatusBadge: ({ revisado }: { revisado: boolean }) => (
    <span>{revisado ? "revisado" : "pendente"}</span>
  ),
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
  test("renders child information and actions", () => {
    render(<ChildrenTable children={children} />);

    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
    expect(screen.getByText("09/02/2016")).toBeInTheDocument();
    expect(screen.getByText("saude")).toBeInTheDocument();
    expect(screen.getByText("educacao")).toBeInTheDocument();
    expect(screen.getByText("pendente")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ver detalhes de maria silva/i })).toBeInTheDocument();
  });
});
