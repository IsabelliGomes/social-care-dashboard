import { render, screen, fireEvent } from "@testing-library/react";
import { ChildDetailHeader } from "./ChildDetailHeader";
import type { Child } from "@/types";

const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
}));

const child: Child = {
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

describe("ChildDetailHeader", () => {
  beforeEach(() => mockBack.mockClear());

  test("renders child name and bairro", () => {
    render(<ChildDetailHeader child={child} />);
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });

  test("renders responsavel", () => {
    render(<ChildDetailHeader child={child} />);
    expect(screen.getByText("Ana Silva")).toBeInTheDocument();
  });

  test("shows avatar initial", () => {
    const { container } = render(<ChildDetailHeader child={child} />);
    expect(container.textContent).toContain("M");
  });

  test("calls router.back when back button is clicked", () => {
    render(<ChildDetailHeader child={child} />);
    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
