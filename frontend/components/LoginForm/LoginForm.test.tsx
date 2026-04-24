import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { LoginForm } from "./LoginForm";

const mockPush = jest.fn();
const mockLogin = jest.fn();
const mockSetToken = jest.fn();
const mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => {});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/lib/api", () => ({
  login: (...args: unknown[]) => mockLogin(...args),
  setToken: (...args: unknown[]) => mockSetToken(...args),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockLogin.mockReset();
    mockSetToken.mockReset();
    mockConsoleError.mockClear();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  test("shows validation errors when fields are empty", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("E-mail é obrigatório")).toBeInTheDocument();
    expect(await screen.findByText("Senha é obrigatória")).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test("submits credentials and redirects on success", async () => {
    mockLogin.mockResolvedValue({ token: "token-123" });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "tecnico@prefeitura.rio" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "painel@2024" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        "tecnico@prefeitura.rio",
        "painel@2024"
      );
      expect(mockSetToken).toHaveBeenCalledWith("token-123");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("shows server error when authentication fails", async () => {
    mockLogin.mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "tecnico@prefeitura.rio" },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: "painel@2024" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(
      await screen.findByText("Credenciais inválidas. Tente novamente.")
    ).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
