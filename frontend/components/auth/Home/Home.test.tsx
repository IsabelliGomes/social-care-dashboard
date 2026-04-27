import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "./Home";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

describe("Home", () => {
  test("renders logo image", () => {
    render(<Home />);
    expect(screen.getByAltText("Cuidado Social")).toBeInTheDocument();
  });

  test("renders entry button", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /Entrar/ })).toBeInTheDocument();
  });
});
