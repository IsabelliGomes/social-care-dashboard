import { readFileSync } from "node:fs";
import path from "node:path";
import { db } from "./client";

type SeedChild = {
  id: string;
  nome: string;
  data_nascimento: string;
  bairro: string;
  responsavel: string;
  saude: object | null;
  educacao: object | null;
  assistencia_social: object | null;
  revisado: boolean;
  revisado_por: string | null;
  revisado_em: string | null;
};

export const runSeed = async (): Promise<void> => {
  const seedPath = path.resolve(__dirname, "../../data/seed.json");
  const children: SeedChild[] = JSON.parse(readFileSync(seedPath, "utf-8"));

  for (const child of children) {
    await db.query(
      `INSERT INTO children (
        id, nome, data_nascimento, bairro, responsavel,
        saude, educacao, assistencia_social,
        revisado, revisado_por, revisado_em
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      ON CONFLICT (id) DO NOTHING`,
      [
        child.id,
        child.nome,
        child.data_nascimento,
        child.bairro,
        child.responsavel,
        JSON.stringify(child.saude),
        JSON.stringify(child.educacao),
        JSON.stringify(child.assistencia_social),
        child.revisado,
        child.revisado_por,
        child.revisado_em,
      ]
    );
  }
};
