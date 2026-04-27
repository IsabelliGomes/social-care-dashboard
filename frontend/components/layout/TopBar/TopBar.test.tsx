import { render, screen } from "@testing-library/react";
import { TopBar } from "./TopBar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({}),
}));

describe("TopBar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders greeting message", () => {
    render(<TopBar />);
    const greeting = screen.getByText(/Bom dia|Boa tarde|Boa noite/);
    expect(greeting).toBeInTheDocument();
  });

  test("renders subtitle", () => {
    render(<TopBar />);
    expect(screen.getByText("Painel de Acompanhamento de Crianças")).toBeInTheDocument();
  });

  test("shows default name when no token", () => {
    render(<TopBar />);
    expect(screen.getByText("técnico")).toBeInTheDocument();
  });
});
