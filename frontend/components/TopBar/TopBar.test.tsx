import { render, screen } from "@testing-library/react";
import { TopBar } from "./TopBar";

function buildToken(payload: object): string {
  const encoded = btoa(JSON.stringify(payload));
  return `header.${encoded}.signature`;
}

describe("TopBar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the notification button", () => {
    render(<TopBar />);

    expect(
      screen.getByRole("button", { name: /notificações/i })
    ).toBeInTheDocument();
  });

  test("shows the subtitle text", () => {
    render(<TopBar />);

    expect(
      screen.getByText("Painel de Acompanhamento de Crianças")
    ).toBeInTheDocument();
  });

  test("shows fallback name when no token is stored", () => {
    render(<TopBar />);

    expect(screen.getByText(/técnico/i)).toBeInTheDocument();
  });

  test("extracts and displays the username from a stored JWT", () => {
    localStorage.setItem(
      "auth_token",
      buildToken({ email: "tecnico@prefeitura.rio" })
    );

    render(<TopBar />);

    expect(screen.getByText(/tecnico/i)).toBeInTheDocument();
  });
});
