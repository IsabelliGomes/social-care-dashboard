import { type Child, getChildren, getChildById, updateChildReview } from "../../repositories/children.repository";

export type ListChildrenFilters = {
  bairro?: string;
  comAlertas?: boolean;
  revisado?: boolean;
  page: number;
  pageSize: number;
};

const hasAnyAlert = (child: Child): boolean => {
  return (
    (child.saude?.alertas?.length ?? 0) > 0 ||
    (child.educacao?.alertas?.length ?? 0) > 0 ||
    (child.assistencia_social?.alertas?.length ?? 0) > 0
  );
};

export const listChildrenService = async (filters: ListChildrenFilters) => {
  let filtered = await getChildren();

  if (filters.bairro) {
    filtered = filtered.filter((child) => child.bairro === filters.bairro);
  }

  if (filters.comAlertas !== undefined) {
    filtered = filtered.filter(
      (child) => hasAnyAlert(child) === filters.comAlertas
    );
  }

  if (filters.revisado !== undefined) {
    filtered = filtered.filter((child) => child.revisado === filters.revisado);
  }

  const total = filtered.length;
  const totalPages = Math.max(Math.ceil(total / filters.pageSize), 1);
  const startIndex = (filters.page - 1) * filters.pageSize;
  const endIndex = startIndex + filters.pageSize;
  const items = filtered.slice(startIndex, endIndex);

  return {
    items,
    pagination: {
      page: filters.page,
      pageSize: filters.pageSize,
      total,
      totalPages,
    },
  };
};

export const getChildByIdService = async (
  id: string
): Promise<Child | undefined> => {
  return getChildById(id);
};

export const reviewChildService = async (
  id: string,
  reviewedBy: string
): Promise<Child | undefined> => {
  return updateChildReview(id, reviewedBy);
};
