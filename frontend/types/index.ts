export type AuthToken = {
  token: string;
};

export type Child = {
  id: string;
  nome: string;
  data_nascimento: string;
  bairro: string;
  responsavel: string;
  saude: {
    ultima_consulta?: string;
    vacinas_em_dia?: boolean;
    alertas?: string[];
  } | null;
  educacao: {
    escola?: string;
    frequencia_percent?: number;
    alertas?: string[];
  } | null;
  assistencia_social: {
    cad_unico?: boolean;
    beneficio_ativo?: boolean;
    alertas?: string[];
  } | null;
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
