import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  test("renders revisado state", () => {
    render(<StatusBadge revisado={true} />);

    expect(screen.getByText("Revisado")).toBeInTheDocument();
  });

  test("renders pendente state", () => {
    render(<StatusBadge revisado={false} />);

    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });
});
