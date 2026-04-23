import { getChildByIdService, listChildrenService } from "../services/children.service";
import * as store from "../data/children.store";
import type { Child } from "../data/children.store";

const mockedChild = (overrides: Partial<Child> = {}): Child => ({
  id: "c001",
  nome: "Ana Clara Mendes",
  data_nascimento: "2020-03-15",
  bairro: "Rocinha",
  responsavel: "Maria Mendes",
  saude: { alertas: [] },
  educacao: { alertas: ["frequencia_baixa"] },
  assistencia_social: { alertas: [] },
  revisado: false,
  revisado_por: null,
  revisado_em: null,
  ...overrides,
});

jest.mock("../data/children.store");

const mockGetChildren = store.getChildren as jest.MockedFunction<
  typeof store.getChildren
>;
const mockGetChildById = store.getChildById as jest.MockedFunction<
  typeof store.getChildById
>;

describe("children service", () => {
  describe("listChildrenService", () => {
    test("returns default pagination result", async () => {
      const defaultPage = 1;
      const defaultPageSize = 2;
      const expectedTotalChildren = 2;
      const expectedTotalPages = 1;

      const seedData = [mockedChild({ id: "c001" }), mockedChild({ id: "c002" })];
      mockGetChildren.mockResolvedValue(seedData);

      const result = await listChildrenService({
        page: defaultPage,
        pageSize: defaultPageSize,
      });

      expect(result.items).toHaveLength(defaultPageSize);
      expect(result.pagination.page).toBe(defaultPage);
      expect(result.pagination.pageSize).toBe(defaultPageSize);
      expect(result.pagination.total).toBe(expectedTotalChildren);
      expect(result.pagination.totalPages).toBe(expectedTotalPages);
    });

    test("filters by bairro", async () => {
      const targetBairro = "Rocinha";
      const minimumExpectedItems = 0;

      mockGetChildren.mockResolvedValue([
        mockedChild({ id: "c001", bairro: "Rocinha" }),
        mockedChild({ id: "c002", bairro: "Maré" }),
        mockedChild({ id: "c003", bairro: "Rocinha" }),
      ]);

      const result = await listChildrenService({
        bairro: targetBairro,
        page: 1,
        pageSize: 50,
      });

      expect(result.items.length).toBeGreaterThan(minimumExpectedItems);
      expect(result.items.every((child) => child.bairro === targetBairro)).toBe(true);
    });

    test("filters by comAlertas=true", async () => {
      const minimumExpectedItems = 0;

      mockGetChildren.mockResolvedValue([
        mockedChild({ id: "c001", saude: { alertas: ["vacinas_atrasadas"] } }),
        mockedChild({ id: "c002", saude: { alertas: [] }, educacao: { alertas: [] }, assistencia_social: { alertas: [] } }),
      ]);

      const result = await listChildrenService({
        comAlertas: true,
        page: 1,
        pageSize: 50,
      });

      expect(result.items.length).toBeGreaterThan(minimumExpectedItems);
      expect(
        result.items.every(
          (child) =>
            (child.saude?.alertas?.length ?? 0) > 0 ||
            (child.educacao?.alertas?.length ?? 0) > 0 ||
            (child.assistencia_social?.alertas?.length ?? 0) > 0
        )
      ).toBe(true);
    });

    test("filters by revisado=true", async () => {
      const reviewedOnly = true;
      const minimumExpectedItems = 0;

      mockGetChildren.mockResolvedValue([
        mockedChild({ id: "c001", revisado: true }),
        mockedChild({ id: "c002", revisado: false }),
      ]);

      const result = await listChildrenService({
        revisado: reviewedOnly,
        page: 1,
        pageSize: 50,
      });

      expect(result.items.length).toBeGreaterThan(minimumExpectedItems);
      expect(result.items.every((child) => child.revisado)).toBe(reviewedOnly);
    });

    test("applies page and pageSize", async () => {
      const targetPage = 2;
      const targetPageSize = 2;
      const expectedTotalChildren = 5;
      const expectedTotalPages = 3;

      mockGetChildren.mockResolvedValue([
        mockedChild({ id: "c001" }),
        mockedChild({ id: "c002" }),
        mockedChild({ id: "c003" }),
        mockedChild({ id: "c004" }),
        mockedChild({ id: "c005" }),
      ]);

      const result = await listChildrenService({
        page: targetPage,
        pageSize: targetPageSize,
      });

      expect(result.items).toHaveLength(targetPageSize);
      expect(result.pagination.page).toBe(targetPage);
      expect(result.pagination.pageSize).toBe(targetPageSize);
      expect(result.pagination.total).toBe(expectedTotalChildren);
      expect(result.pagination.totalPages).toBe(expectedTotalPages);
    });
  });

  describe("getChildByIdService", () => {
    test("returns a child when id exists", async () => {
      const existingChildId = "c001";

      mockGetChildById.mockResolvedValue(mockedChild({ id: existingChildId }));

      const result = await getChildByIdService(existingChildId);

      expect(result).toBeDefined();
      expect(result?.id).toBe(existingChildId);
    });

    test("returns undefined when id does not exist", async () => {
      const nonExistingChildId = "fakeId";

      mockGetChildById.mockResolvedValue(undefined);

      const result = await getChildByIdService(nonExistingChildId);

      expect(result).toBeUndefined();
    });
  });
});
