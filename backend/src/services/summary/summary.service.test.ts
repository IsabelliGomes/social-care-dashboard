import { getSummaryService } from "./summary.service";
import * as repo from "../../repositories/children.repository";
import type { Child } from "../../repositories/children.repository";

jest.mock("../../repositories/children.repository");

const mockGetChildren = repo.getChildren as jest.MockedFunction<
  typeof repo.getChildren
>;

const mockedChild = (overrides: Partial<Child> = {}): Child => ({
  id: "c001",
  nome: "Ana Clara Mendes",
  data_nascimento: "2020-03-15",
  bairro: "Rocinha",
  responsavel: "Maria Mendes",
  saude: { alertas: [] },
  educacao: { alertas: [] },
  assistencia_social: { alertas: [] },
  revisado: false,
  revisado_por: null,
  revisado_em: null,
  ...overrides,
});

describe("getSummaryService", () => {
  test("returns aggregated summary data", async () => {
    const expectedTotalChildren = 3;
    const expectedReviewedChildren = 1;
    const expectedHealthAlerts = 1;
    const expectedEducationAlerts = 1;
    const expectedSocialAssistanceAlerts = 1;

    mockGetChildren.mockResolvedValue([
      mockedChild({ id: "c001", saude: { alertas: ["vacinas_atrasadas"] }, revisado: true }),
      mockedChild({ id: "c002", educacao: { alertas: ["frequencia_baixa"] } }),
      mockedChild({ id: "c003", assistencia_social: { alertas: ["beneficio_suspenso"] } }),
    ]);

    const result = await getSummaryService();

    expect(result.totalChildren).toBe(expectedTotalChildren);
    expect(result.reviewedChildren).toBe(expectedReviewedChildren);
    expect(result.alertsByArea.saude).toBe(expectedHealthAlerts);
    expect(result.alertsByArea.educacao).toBe(expectedEducationAlerts);
    expect(result.alertsByArea.assistenciaSocial).toBe(expectedSocialAssistanceAlerts);
  });
});
