import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/lib/api", () => ({
  login: jest.fn(),
  setToken: jest.fn(),
}));

jest.mock("@/components/ui", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Card: ({ children }: any) => <div>{children}</div>,
  InputField: ({ label, value, onChange, ...props }: any) => (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onChange} {...props} />
    </div>
  ),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form title", () => {
    render(<LoginForm />);
    expect(screen.getByText("Cuidado Social")).toBeInTheDocument();
  });

  test("renders submit button", () => {
    render(<LoginForm />);
    expect(screen.getByRole("button", { name: /Entrar/ })).toBeInTheDocument();
  });
});
