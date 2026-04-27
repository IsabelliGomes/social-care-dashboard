import { act, render, screen, waitFor } from "@testing-library/react";
import { getChildren } from "@/lib/api";
import ChildrenPage from "@/app/(dashboard)/children/page";

jest.mock("@/lib/api", () => ({
  getChildren: jest.fn(),
  reviewChild: jest.fn(),
}));

jest.mock("@/components/layout", () => ({
  TopBar: () => <div data-testid="topbar" />,
}));

jest.mock("@/components/children", () => ({
  ChildFilters: () => <div data-testid="filters" />,
  ChildrenTable: ({ children, onReview, reviewingId }: { children: unknown[]; onReview: jest.Mock; reviewingId: string | null }) => (
    <div data-testid="table" onClick={() => onReview("1")}>{children.length}</div>
  ),
  ChildrenCards: ({ children }: { children: unknown[] }) => (
    <div data-testid="cards">{children.length}</div>
  ),
}));

jest.mock("@/components/ui", () => ({
  Pagination: () => <div data-testid="pagination" />,
}));

const mockedGetChildren = getChildren as jest.MockedFunction<typeof getChildren>;

describe("ChildrenPage", () => {
  beforeEach(() => {
    mockedGetChildren.mockResolvedValue({
      items: [
        {
          id: "1",
          nome: "Maria Silva",
          data_nascimento: "2016-02-10",
          bairro: "Centro",
          responsavel: "Ana Silva",
          saude: null,
          educacao: null,
          assistencia_social: null,
          revisado: false,
          revisado_por: null,
          revisado_em: null,
        },
      ],
      pagination: { page: 1, pageSize: 5, total: 1, totalPages: 1 },
    });
  });

  test("fetches children and renders the structure", async () => {
    await act(async () => {
      render(<ChildrenPage />);
    });

    expect(screen.getByTestId("topbar")).toBeInTheDocument();
    expect(screen.getByText(/Crian/)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedGetChildren).toHaveBeenCalledWith(1, 5, {
        bairro: undefined,
        comAlertas: undefined,
        revisado: undefined,
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("table")).toHaveTextContent("1");
      expect(screen.getByTestId("cards")).toHaveTextContent("1");
    });
  });
});
