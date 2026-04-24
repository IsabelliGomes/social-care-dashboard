import { render, screen } from "@testing-library/react";

import { Card } from "./Card";

describe("Card", () => {
  test("renders children", () => {
    render(
      <Card>
        <p>Conteúdo do card</p>
      </Card>
    );

    expect(screen.getByText("Conteúdo do card")).toBeInTheDocument();
  });

  test("applies extra class names", () => {
    const { container } = render(<Card className="custom-card">Conteúdo</Card>);

    expect(container.firstElementChild).toHaveClass("custom-card");
  });
});
