import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  test("renders the label", () => {
    render(<Button>Entrar</Button>);
    
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  test("calls the click handler when enabled", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Entrar</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("shows the loading state and disables interaction", () => {
    const handleClick = jest.fn();

    render(
      <Button loading onClick={handleClick}>
        Entrar
      </Button>
    );

    const button = screen.getByRole("button", { name: "Autenticando..." });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("applies the full width modifier when requested", () => {
    render(
      <Button fullWidth variant="primary">
        Entrar
      </Button>
    );

    expect(screen.getByRole("button", { name: "Entrar" })).toHaveClass(
      "button--fullWidth"
    );
  });
});
