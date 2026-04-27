import { render, screen, act } from "@testing-library/react";
import ChildDetailPage from "./page";
import type { Child } from "@/types";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "42" }),
  useRouter: () => ({ back: jest.fn() }),
}));

jest.mock("@/lib/api", () => {
  const mockChild: Child = {
    id: "42",
    nome: "Maria Silva",
    data_nascimento: "2010-06-15",
    bairro: "Centro",
    responsavel: "Ana Silva",
    saude: { alertas: ["Acompanhamento pendente"], ultima_consulta: "2024-02-10", vacinas_em_dia: false },
    educacao: { escola: "CIEP 208", frequencia_percent: 41, alertas: ["frequencia_baixa"] },
    assistencia_social: { cad_unico: false, beneficio_ativo: false, alertas: ["cadastro_desatualizado"] },
    revisado: false,
    revisado_por: null,
    revisado_em: null,
  };

  return {
    getChildById: jest.fn().mockResolvedValue(mockChild),
    reviewChild: jest.fn(),
  };
});

jest.mock("@/components/layout", () => ({
  TopBar: () => <div data-testid="topbar" />,
}));

jest.mock("@/components/children", () => ({
  ChildDetailHeader: ({ child }: { child: Child }) => (
    <div data-testid="detail-header">{child.nome}</div>
  ),
  ChildStatusCard: () => <div data-testid="status-card" />,
}));

jest.mock("@/components/dashboard", () => ({
  AreaCard: ({ area }: { area: string }) => <div data-testid={`area-${area}`} />,
}));

describe("ChildDetailPage", () => {
  test("renders child data after loading", async () => {
    await act(async () => {
      render(<ChildDetailPage />);
    });

    expect(screen.getByTestId("detail-header")).toBeInTheDocument();
    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByTestId("status-card")).toBeInTheDocument();
    expect(screen.getByTestId("area-saude")).toBeInTheDocument();
    expect(screen.getByTestId("area-educacao")).toBeInTheDocument();
    expect(screen.getByTestId("area-assistenciaSocial")).toBeInTheDocument();
  });

  test("shows error when fetch fails", async () => {
    const { getChildById } = await import("@/lib/api");
    (getChildById as jest.Mock).mockRejectedValueOnce(new Error("fail"));

    await act(async () => {
      render(<ChildDetailPage />);
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
