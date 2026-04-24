import { fireEvent, render, screen } from "@testing-library/react";
import { BottomBar } from "./BottomBar";

const mockPush = jest.fn();
const mockPathname = jest.fn(() => "/dashboard");

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname(),
}));

jest.mock("@/lib/api", () => ({
  clearToken: jest.fn(() => localStorage.removeItem("auth_token")),
}));

describe("BottomBar", () => {
  beforeEach(() => {
    mockPush.mockClear();
    localStorage.clear();
  });

  test("renders navigation links", () => {
    render(<BottomBar />);

    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /crianças/i })).toBeInTheDocument();
  });

  test("renders the logout button", () => {
    render(<BottomBar />);

    expect(
      screen.getByRole("button", { name: /sair/i })
    ).toBeInTheDocument();
  });

  test("marks active link based on current pathname", () => {
    mockPathname.mockReturnValue("/dashboard");
    render(<BottomBar />);

    expect(
      screen.getByRole("link", { name: /dashboard/i })
    ).toHaveAttribute("aria-current", "page");
  });

  test("clears token and redirects to home on logout", () => {
    localStorage.setItem("auth_token", "some-token");
    render(<BottomBar />);

    fireEvent.click(screen.getByRole("button", { name: /sair/i }));

    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
