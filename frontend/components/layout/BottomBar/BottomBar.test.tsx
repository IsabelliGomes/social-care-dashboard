import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BottomBar } from "./BottomBar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/lib/api", () => ({
  clearToken: jest.fn(),
}));

describe("BottomBar", () => {
  test("renders navigation bar", () => {
    render(<BottomBar />);
    expect(screen.getByRole("navigation", { name: /Navegação mobile/ })).toBeInTheDocument();
  });

  test("renders navigation items", () => {
    render(<BottomBar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Crianças")).toBeInTheDocument();
  });

  test("renders logout button", () => {
    render(<BottomBar />);
    expect(screen.getByRole("button", { name: /Sair da aplicação/ })).toBeInTheDocument();
  });

  test("calls clearToken when logout is clicked", async () => {
    const { clearToken } = await import("@/lib/api");
    render(<BottomBar />);
    await userEvent.click(screen.getByRole("button", { name: /Sair da aplicação/ }));
    expect(clearToken).toHaveBeenCalled();
  });

  test("marks current page as active", () => {
    render(<BottomBar />);
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveAttribute("aria-current", "page");
  });
});
