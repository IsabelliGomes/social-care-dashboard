import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LateralBar } from "./LateralBar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

jest.mock("@/lib/api", () => ({
  clearToken: jest.fn(),
}));

describe("LateralBar", () => {
  test("renders lateral bar navigation", () => {
    render(<LateralBar />);
    expect(screen.getByRole("navigation", { name: /Navegação principal/ })).toBeInTheDocument();
  });

  test("renders navigation items", () => {
    render(<LateralBar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Crianças")).toBeInTheDocument();
  });

  test("renders logo image", () => {
    render(<LateralBar />);
    expect(screen.getByAltText("Cuidado Social")).toBeInTheDocument();
  });

  test("renders logout button", () => {
    render(<LateralBar />);
    expect(screen.getByRole("button", { name: /Sair da aplicação/ })).toBeInTheDocument();
  });

  test("calls clearToken when logout is clicked", async () => {
    const { clearToken } = await import("@/lib/api");
    render(<LateralBar />);
    await userEvent.click(screen.getByRole("button", { name: /Sair da aplicação/ }));
    expect(clearToken).toHaveBeenCalled();
  });

  test("marks current page as active", () => {
    render(<LateralBar />);
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveAttribute("aria-current", "page");
  });
});
