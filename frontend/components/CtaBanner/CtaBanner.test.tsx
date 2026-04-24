import { render, screen } from "@testing-library/react";
import { CtaBanner } from "./CtaBanner";

describe("CtaBanner", () => {
  test("renders the title and description", () => {
    render(<CtaBanner />);

    expect(
      screen.getByText(/Acompanhe e faça a diferença/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Acesse a lista completa de crianças/i)
    ).toBeInTheDocument();
  });

  test("renders the action link pointing to /children", () => {
    render(<CtaBanner />);

    const link = screen.getByRole("link", { name: /ver crianças/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/children");
  });
});
