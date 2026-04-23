import {
  getChildByIdService,
  listChildrenService,
} from "../services/children.service";

describe("children service", () => {
  describe("listChildrenService", () => {
    test("returns default pagination result", () => {
      const defaultPage = 1;
      const defaultPageSize = 10;
      const expectedTotalChildren = 25;
      const expectedTotalPages = 3;

      const result = listChildrenService({
        page: defaultPage,
        pageSize: defaultPageSize,
      });

      expect(result.items).toHaveLength(defaultPageSize);
      expect(result.pagination.page).toBe(defaultPage);
      expect(result.pagination.pageSize).toBe(defaultPageSize);
      expect(result.pagination.total).toBe(expectedTotalChildren);
      expect(result.pagination.totalPages).toBe(expectedTotalPages);
    });

    test("filters by bairro", () => {
      const targetBairro = "Rocinha";
      const firstPage = 1;
      const largePageSize = 50;
      const minimumExpectedItems = 0;

      const result = listChildrenService({
        bairro: targetBairro,
        page: firstPage,
        pageSize: largePageSize,
      });

      expect(result.items.length).toBeGreaterThan(minimumExpectedItems);
      expect(result.items.every((child) => child.bairro === targetBairro)).toBe(true);
    });

    test("filters by comAlertas=true", () => {
      const withAlertsOnly = true;
      const firstPage = 1;
      const largePageSize = 50;
      const minimumExpectedItems = 0;

      const result = listChildrenService({
        comAlertas: withAlertsOnly,
        page: firstPage,
        pageSize: largePageSize,
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

    test("filters by revisado=true", () => {
      const reviewedOnly = true;
      const firstPage = 1;
      const largePageSize = 50;
      const minimumExpectedItems = 0;

      const result = listChildrenService({
        revisado: reviewedOnly,
        page: firstPage,
        pageSize: largePageSize,
      });

      expect(result.items.length).toBeGreaterThan(minimumExpectedItems);
      expect(result.items.every((child) => child.revisado)).toBe(reviewedOnly);
    });

    test("applies page and pageSize", () => {
      const targetPage = 2;
      const targetPageSize = 5;
      const expectedTotalChildren = 25;
      const expectedTotalPages = 5;

      const result = listChildrenService({
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
    test("returns a child when id exists", () => {
      const existingChildId = "c001";

      const result = getChildByIdService(existingChildId);

      expect(result).toBeDefined();
      expect(result?.id).toBe(existingChildId);
    });

    test("returns undefined when id does not exist", () => {
      const nonExistingChildId = "fakeId";

      const result = getChildByIdService(nonExistingChildId);

      expect(result).toBeUndefined();
    });
  });
});