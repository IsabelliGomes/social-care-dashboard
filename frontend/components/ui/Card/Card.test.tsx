import { render } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  test("renders children", () => {
    const { getByText } = render(<Card>Card content</Card>);
    expect(getByText("Card content")).toBeInTheDocument();
  });

  test("applies card styles", () => {
    const { container } = render(<Card>Test</Card>);
    expect(container.querySelector(".card")).toBeInTheDocument();
  });

  test("merges custom className with card class", () => {
    const { container } = render(<Card className="custom-class">Test</Card>);
    const cardElement = container.querySelector(".card");
    expect(cardElement).toHaveClass("card", "custom-class");
  });

  test("renders multiple children", () => {
    const { getByText } = render(
      <Card>
        <h1>Title</h1>
        <p>Content</p>
      </Card>
    );
    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Content")).toBeInTheDocument();
  });
});
