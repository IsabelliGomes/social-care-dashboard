import { render, screen } from "@testing-library/react";
import { AlertBadge } from "./AlertBadge";

describe("AlertBadge", () => {
  test("renders saude badge with correct label", () => {
    render(<AlertBadge area="saude" />);
    expect(screen.getByText("Saúde")).toBeInTheDocument();
  });

  test("renders educacao badge with correct label", () => {
    render(<AlertBadge area="educacao" />);
    expect(screen.getByText("Educação")).toBeInTheDocument();
  });

  test("renders assistenciaSocial badge with correct label", () => {
    render(<AlertBadge area="assistenciaSocial" />);
    expect(screen.getByText("Assistência")).toBeInTheDocument();
  });

  test("applies correct area class", () => {
    const { container } = render(<AlertBadge area="saude" />);
    expect(container.querySelector(".saude")).toBeInTheDocument();
  });

  test("applies badge base class", () => {
    const { container } = render(<AlertBadge area="educacao" />);
    expect(container.querySelector(".badge")).toBeInTheDocument();
  });
});
