import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChildDetailHeader } from "./ChildDetailHeader";
import type { Child } from "@/types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
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

describe("ChildDetailHeader", () => {
  test("renders child name", () => {
    render(<ChildDetailHeader child={mockChild} />);
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
  });

  test("renders back button", () => {
    render(<ChildDetailHeader child={mockChild} />);
    expect(screen.getByRole("button", { name: /Voltar/ })).toBeInTheDocument();
  });

  test("renders child birth date", () => {
    const { container } = render(<ChildDetailHeader child={mockChild} />);
    expect(container.textContent).toMatch(/2014|2015/);
  });

  test("renders child age", () => {
    render(<ChildDetailHeader child={mockChild} />);
    expect(screen.getByText(/anos/)).toBeInTheDocument();
  });

  test("renders child location", () => {
    render(<ChildDetailHeader child={mockChild} />);
    expect(screen.getByText("Centro")).toBeInTheDocument();
  });

  test("renders responsible person", () => {
    render(<ChildDetailHeader child={mockChild} />);
    expect(screen.getByText("Ana Silva")).toBeInTheDocument();
  });

  test("calls router.back when back button is clicked", async () => {
    const { useRouter } = await import("next/navigation");
    const mockBack = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      back: mockBack,
    });

    render(<ChildDetailHeader child={mockChild} />);
    await userEvent.click(screen.getByRole("button", { name: /Voltar/ }));
    expect(mockBack).toHaveBeenCalled();
  });

  test("renders avatar with first letter", () => {
    const { container } = render(<ChildDetailHeader child={mockChild} />);
    const avatar = container.querySelector(".avatar");
    expect(avatar).toHaveTextContent("M");
  });
});
