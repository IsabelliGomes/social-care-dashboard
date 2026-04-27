import { render, screen } from "@testing-library/react";
import { ChildrenCards } from "./ChildrenCards";
import type { Child } from "@/types";

jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

jest.mock("@/components/ui", () => ({
  AlertBadge: ({ area }: any) => <span>{area}</span>,
  StatusBadge: ({ revisado }: any) => <span>{revisado ? "Revisado" : "Pendente"}</span>,
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

describe("ChildrenCards", () => {
  test("renders children list", () => {
    render(<ChildrenCards children={[mockChild]} />);
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
  });

  test("renders child details", () => {
    const { container } = render(<ChildrenCards children={[mockChild]} />);
    expect(container.textContent).toContain("Centro");
    expect(container.textContent).toContain("Maria Silva");
  });

  test("renders status badge", () => {
    render(<ChildrenCards children={[mockChild]} />);
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });

  test("renders link to child detail", () => {
    render(<ChildrenCards children={[mockChild]} />);
    const link = screen.getByRole("link") as HTMLAnchorElement;
    expect(link.href).toContain("/children/1");
  });

  test("renders alert badges when present", () => {
    render(<ChildrenCards children={[mockChild]} />);
    expect(screen.getByText("saude")).toBeInTheDocument();
  });

  test("shows empty alerts indicator when no alerts", () => {
    const childNoAlerts = { ...mockChild, saude: null, educacao: null, assistencia_social: null };
    render(<ChildrenCards children={[childNoAlerts]} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  test("renders multiple children", () => {
    const child2 = { ...mockChild, id: "2", nome: "João Silva" };
    render(<ChildrenCards children={[mockChild, child2]} />);
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("João Silva")).toBeInTheDocument();
  });
});
