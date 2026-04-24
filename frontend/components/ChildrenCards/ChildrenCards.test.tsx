import { render, screen } from "@testing-library/react";
import type { Child } from "@/types";
import { ChildrenCards } from "./ChildrenCards";

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
    educacao: null,
    assistencia_social: null,
    revisado: true,
    revisado_por: "tech",
    revisado_em: "2026-04-23T10:00:00Z",
  },
];

describe("ChildrenCards", () => {
  test("renders child card information", () => {
    const { container } = render(<ChildrenCards children={children} />);

    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText(/Centro/i)).toBeInTheDocument();
    const subElement = container.querySelector(".sub");
    expect(subElement?.textContent?.includes("09/02/2016")).toBe(true);
    expect(screen.getByText("saude")).toBeInTheDocument();
    expect(screen.getByText("revisado")).toBeInTheDocument();
  });
});
