import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AlertsByAreaChart } from "./AlertsByAreaChart";

const mockGetChildren = jest.fn();

jest.mock("@/lib/api", () => ({
  getChildren: (...args: unknown[]) => mockGetChildren(...args),
}));

jest.mock("recharts", () => ({
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: ({ dataKey }: any) => <div data-testid={`bar-${dataKey}`} />,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
}));

const makeChild = (bairro: string, saude = false, educacao = false, assistencia = false) => ({
  id: Math.random().toString(),
  nome: "Criança",
  data_nascimento: "2015-01-01",
  bairro,
  responsavel: "Responsável",
  saude: saude ? { alertas: ["alerta"] } : null,
  educacao: educacao ? { alertas: ["alerta"] } : null,
  assistencia_social: assistencia ? { alertas: ["alerta"] } : null,
  revisado: false,
  revisado_por: null,
  revisado_em: null,
});

const mockChildren = [
  makeChild("Centro", true, true, false),
  makeChild("Centro", true, false, false),
  makeChild("Zona Norte", false, true, true),
];

describe("AlertsByAreaChart", () => {
  beforeEach(() => {
    mockGetChildren.mockReset();
  });

  test("shows skeleton while loading", () => {
    mockGetChildren.mockReturnValue(new Promise(() => {}));
    const { container } = render(<AlertsByAreaChart />);

    expect(container.querySelector("[aria-busy='true']")).toBeInTheDocument();
    expect(screen.queryByTestId("bar-chart")).not.toBeInTheDocument();
  });

  test("renders chart and filter after data loads", async () => {
    mockGetChildren.mockResolvedValue({
      items: mockChildren,
      pagination: { page: 1, pageSize: 500, total: 3, totalPages: 1 },
    });

    render(<AlertsByAreaChart />);

    await waitFor(() => {
      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    });

    expect(screen.getByRole("combobox", { name: /filtrar por bairro/i })).toBeInTheDocument();
  });

  test("populates filter with all neighborhoods plus Todos", async () => {
    mockGetChildren.mockResolvedValue({
      items: mockChildren,
      pagination: { page: 1, pageSize: 500, total: 3, totalPages: 1 },
    });

    render(<AlertsByAreaChart />);

    await waitFor(() => screen.getByTestId("bar-chart"));

    const select = screen.getByRole("combobox", { name: /filtrar por bairro/i });
    const options = Array.from((select as HTMLSelectElement).options).map((o) => o.value);

    expect(options).toContain("Todos");
    expect(options).toContain("Centro");
    expect(options).toContain("Zona Norte");
  });

  test("filters data when a neighborhood is selected", async () => {
    mockGetChildren.mockResolvedValue({
      items: mockChildren,
      pagination: { page: 1, pageSize: 500, total: 3, totalPages: 1 },
    });

    render(<AlertsByAreaChart />);

    await waitFor(() => screen.getByTestId("bar-chart"));

    const select = screen.getByRole("combobox", { name: /filtrar por bairro/i });
    fireEvent.change(select, { target: { value: "Centro" } });

    expect((select as HTMLSelectElement).value).toBe("Centro");
  });

  test("renders the report link", async () => {
    mockGetChildren.mockResolvedValue({
      items: [],
      pagination: { page: 1, pageSize: 500, total: 0, totalPages: 1 },
    });

    render(<AlertsByAreaChart />);

    await waitFor(() => screen.getByTestId("bar-chart"));

    expect(
      screen.getByRole("link", { name: /ver relatório completo/i })
    ).toBeInTheDocument();
  });
});
