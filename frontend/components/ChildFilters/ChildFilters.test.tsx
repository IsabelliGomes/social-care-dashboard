import { fireEvent, render, screen } from "@testing-library/react";
import { ChildFilters, type Filters } from "./ChildFilters";

describe("ChildFilters", () => {
  const bairros = ["Centro", "Lapa", "Meier"];
  const baseFilters: Filters = { bairro: "", comAlertas: "", revisado: "" };

  test("renders all filters and the clear button", () => {
    render(
      <ChildFilters
        filters={baseFilters}
        bairros={bairros}
        onChange={jest.fn()}
        onClear={jest.fn()}
      />
    );

    expect(screen.getByLabelText("Filtrar por bairro")).toBeInTheDocument();
    expect(screen.getByLabelText("Filtrar por alertas")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /revis/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /limpar filtros/i })).toBeDisabled();
  });

  test("calls onChange when a select changes", () => {
    const onChange = jest.fn();

    render(
      <ChildFilters
        filters={baseFilters}
        bairros={bairros}
        onChange={onChange}
        onClear={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Filtrar por bairro"), {
      target: { value: "Centro" },
    });

    expect(onChange).toHaveBeenCalledWith({
      bairro: "Centro",
      comAlertas: "",
      revisado: "",
    });
  });

  test("shows active filter count and enables clear button", () => {
    render(
      <ChildFilters
        filters={{ bairro: "Centro", comAlertas: "true", revisado: "false" }}
        bairros={bairros}
        onChange={jest.fn()}
        onClear={jest.fn()}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /limpar filtros/i })).toBeEnabled();
  });

  test("calls onClear when clicking clear", () => {
    const onClear = jest.fn();

    render(
      <ChildFilters
        filters={{ bairro: "Centro", comAlertas: "true", revisado: "false" }}
        bairros={bairros}
        onChange={jest.fn()}
        onClear={onClear}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /limpar filtros/i }));

    expect(onClear).toHaveBeenCalled();
  });
});
