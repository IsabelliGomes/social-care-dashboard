import { render } from "@testing-library/react";
import { AlertBadge } from "./AlertBadge";

describe("AlertBadge", () => {
  test("renders the saude label", () => {
    const { container } = render(<AlertBadge area="saude" />);

    expect(container.querySelector(".saude")).toBeInTheDocument();
  });

  test("renders the educacao label", () => {
    const { container } = render(<AlertBadge area="educacao" />);

    expect(container.querySelector(".educacao")).toBeInTheDocument();
  });

  test("renders the assistenciaSocial label", () => {
    const { container } = render(<AlertBadge area="assistenciaSocial" />);

    expect(container.querySelector(".assistenciaSocial")).toBeInTheDocument();
  });
});
