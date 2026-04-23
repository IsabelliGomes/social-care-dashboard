export type AuthToken = {
  token: string;
};

export type Child = {
  id: string;
  nome: string;
  data_nascimento: string;
  bairro: string;
  responsavel: string;
  saude: { alertas?: string[] } | null;
  educacao: { alertas?: string[] } | null;
  assistencia_social: { alertas?: string[] } | null;
  revisado: boolean;
  revisado_por: string | null;
  revisado_em: string | null;
};

export type ListChildrenResponse = {
  items: Child[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type SummaryResponse = {
  totalChildren: number;
  reviewedChildren: number;
  alertsByArea: {
    saude: number;
    educacao: number;
    assistenciaSocial: number;
  };
};
