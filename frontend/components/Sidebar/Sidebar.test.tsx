import { fireEvent, render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";

const mockPush = jest.fn();
const mockPathname = jest.fn(() => "/dashboard");

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => <img {...props} />,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname(),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    mockPush.mockClear();
    localStorage.clear();
  });

  test("renders logo and navigation links", () => {
    render(<Sidebar />);

    expect(screen.getByAltText("Cuidado Social")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /crianças/i })).toBeInTheDocument();
  });

  test("marks the active link based on current pathname", () => {
    mockPathname.mockReturnValue("/dashboard");
    render(<Sidebar />);

    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboardLink).toHaveAttribute("aria-current", "page");
  });

  test("does not mark inactive links as current", () => {
    mockPathname.mockReturnValue("/dashboard");
    render(<Sidebar />);

    const childrenLink = screen.getByRole("link", { name: /crianças/i });
    expect(childrenLink).not.toHaveAttribute("aria-current");
  });

  test("clears token and redirects to home on logout", () => {
    localStorage.setItem("token", "some-token");
    render(<Sidebar />);

    fireEvent.click(screen.getByRole("button", { name: /sair/i }));

    expect(localStorage.getItem("token")).toBeNull();
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
