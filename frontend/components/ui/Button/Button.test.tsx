import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  test("renders button with children", () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole("button", { name: /Clique aqui/ })).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("disables button when loading prop is true", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  test("shows loading text when loading", () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByText("Autenticando...")).toBeInTheDocument();
  });

  test("renders with primary variant by default", () => {
    const { container } = render(<Button>Test</Button>);
    expect(container.querySelector(".button--primary")).toBeInTheDocument();
  });

  test("renders with secondary variant when specified", () => {
    const { container } = render(<Button variant="secondary">Test</Button>);
    expect(container.querySelector(".button--secondary")).toBeInTheDocument();
  });

  test("renders as fullWidth when specified", () => {
    const { container } = render(<Button fullWidth>Full</Button>);
    expect(container.querySelector(".button--fullWidth")).toBeInTheDocument();
  });

  test("sets button type correctly", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
