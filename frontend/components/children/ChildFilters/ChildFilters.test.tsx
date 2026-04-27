import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChildFilters } from "./ChildFilters";

describe("ChildFilters", () => {
  const mockOnChange = jest.fn();
  const mockOnClear = jest.fn();
  const defaultProps = {
    filters: { bairro: "", comAlertas: "", revisado: "" },
    bairros: ["Centro", "Zona Norte", "Zona Sul"],
    onChange: mockOnChange,
    onClear: mockOnClear,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnClear.mockClear();
  });

  test("renders all select fields", () => {
    render(<ChildFilters {...defaultProps} />);
    expect(screen.getByLabelText("Bairro")).toBeInTheDocument();
    expect(screen.getByLabelText("Alertas")).toBeInTheDocument();
    expect(screen.getByLabelText("Revisado")).toBeInTheDocument();
  });

  test("renders bairro options", () => {
    render(<ChildFilters {...defaultProps} />);
    const bairroSelect = screen.getByLabelText("Bairro");
    expect(bairroSelect).toHaveTextContent("Centro");
    expect(bairroSelect).toHaveTextContent("Zona Norte");
  });

  test("calls onChange when bairro select changes", async () => {
    render(<ChildFilters {...defaultProps} />);
    const bairroSelect = screen.getByLabelText("Bairro") as HTMLSelectElement;
    await userEvent.selectOptions(bairroSelect, "Centro");
    expect(mockOnChange).toHaveBeenCalled();
  });

  test("renders clear button", () => {
    render(<ChildFilters {...defaultProps} />);
    expect(screen.getByRole("button", { name: /Limpar filtros/ })).toBeInTheDocument();
  });

  test("disables clear button when no filters are active", () => {
    render(<ChildFilters {...defaultProps} />);
    expect(screen.getByRole("button", { name: /Limpar filtros/ })).toBeDisabled();
  });

  test("enables clear button when filters are active", () => {
    const filtersWithData = { bairro: "Centro", comAlertas: "", revisado: "" };
    render(<ChildFilters {...defaultProps} filters={filtersWithData} />);
    expect(screen.getByRole("button", { name: /Limpar filtros/ })).not.toBeDisabled();
  });

  test("shows badge with active filter count", () => {
    const filtersWithData = { bairro: "Centro", comAlertas: "true", revisado: "" };
    render(<ChildFilters {...defaultProps} filters={filtersWithData} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("calls onClear when clear button is clicked", async () => {
    const filtersWithData = { bairro: "Centro", comAlertas: "", revisado: "" };
    render(<ChildFilters {...defaultProps} filters={filtersWithData} />);
    await userEvent.click(screen.getByRole("button", { name: /Limpar filtros/ }));
    expect(mockOnClear).toHaveBeenCalled();
  });
});
