import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  test("renders revisado badge when revisado is true", () => {
    render(<StatusBadge revisado={true} />);
    expect(screen.getByText("Revisado")).toBeInTheDocument();
  });

  test("renders pendente badge when revisado is false", () => {
    render(<StatusBadge revisado={false} />);
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });

  test("applies revisado class when revisado is true", () => {
    const { container } = render(<StatusBadge revisado={true} />);
    expect(container.querySelector(".revisado")).toBeInTheDocument();
  });

  test("applies pendente class when revisado is false", () => {
    const { container } = render(<StatusBadge revisado={false} />);
    expect(container.querySelector(".pendente")).toBeInTheDocument();
  });

  test("renders badge base class", () => {
    const { container } = render(<StatusBadge revisado={true} />);
    expect(container.querySelector(".badge")).toBeInTheDocument();
  });
});
