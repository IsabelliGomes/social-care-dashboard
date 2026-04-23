import { db } from "../db/client";

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

export const getChildren = async (): Promise<Child[]> => {
  const result = await db.query<Child>("SELECT * FROM children ORDER BY id");
  return result.rows;
};

export const getChildById = async (id: string): Promise<Child | undefined> => {
  const result = await db.query<Child>(
    "SELECT * FROM children WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

export const updateChildReview = async (
  id: string,
  revisadoPor: string
): Promise<Child | undefined> => {
  const result = await db.query<Child>(
    `UPDATE children
     SET revisado = TRUE, revisado_por = $1, revisado_em = NOW()
     WHERE id = $2
     RETURNING *`,
    [revisadoPor, id]
  );
  return result.rows[0];
};
