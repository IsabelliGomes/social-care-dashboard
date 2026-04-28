import { render, screen, waitFor } from "@testing-library/react";
import { AuthGuard } from "./AuthGuard";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => "/dashboard",
}));

jest.mock("@/lib/api", () => ({
  getToken: jest.fn(),
  clearToken: jest.fn(),
  isTokenValid: jest.fn(),
}));

describe("AuthGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders children when token is valid", async () => {
    const { getToken, isTokenValid } = await import("@/lib/api");
    const mockGetToken = getToken as jest.Mock;
    const mockIsTokenValid = isTokenValid as jest.Mock;
    
    mockGetToken.mockReturnValue("valid-token");
    mockIsTokenValid.mockReturnValue(true);
    
    render(
      <AuthGuard>
        <div>Protected content</div>
      </AuthGuard>
    );
    
    await waitFor(() => {
      expect(screen.getByText("Protected content")).toBeInTheDocument();
    });
  });

  test("renders null when token is missing", async () => {
    const { getToken } = await import("@/lib/api");
    const mockGetToken = getToken as jest.Mock;
    mockGetToken.mockReturnValue(null);
    
    render(
      <AuthGuard>
        <div>Protected content</div>
      </AuthGuard>
    );
    
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  test("renders null when token is invalid", async () => {
    const { getToken, isTokenValid } = await import("@/lib/api");
    const mockGetToken = getToken as jest.Mock;
    const mockIsTokenValid = isTokenValid as jest.Mock;
    
    mockGetToken.mockReturnValue("invalid-token");
    mockIsTokenValid.mockReturnValue(false);
    
    render(
      <AuthGuard>
        <div>Protected content</div>
      </AuthGuard>
    );
    
    await waitFor(() => {
      expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
    });
  });

  test("clears token and redirects when token is invalid", async () => {
    const { getToken, isTokenValid, clearToken } = await import("@/lib/api");
    const mockGetToken = getToken as jest.Mock;
    const mockIsTokenValid = isTokenValid as jest.Mock;
    const mockClearToken = clearToken as jest.Mock;
    
    mockGetToken.mockReturnValue("invalid-token");
    mockIsTokenValid.mockReturnValue(false);
    
    render(
      <AuthGuard>
        <div>Protected content</div>
      </AuthGuard>
    );
    
    await waitFor(() => {
      expect(mockClearToken).toHaveBeenCalled();
    });
  });
});
