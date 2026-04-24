import { fireEvent, render, screen } from "@testing-library/react";
import { Home } from "./Home";

const mockPush = jest.fn();

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => <img {...props} />,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Home", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  test("renders the brand logo and entry button", () => {
    render(<Home />);

    expect(
      screen.getByAltText("Cuidado Social")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  test("navigates to the login page when clicking the button", () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
