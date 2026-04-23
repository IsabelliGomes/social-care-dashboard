import { readFileSync } from "node:fs";
import path from "node:path";

type RecordWithAlerts = {
  alertas?: string[];
} | null;

export type Child = {
  id: string;
  nome: string;
  data_nascimento: string;
  bairro: string;
  responsavel: string;
  saude: RecordWithAlerts;
  educacao: RecordWithAlerts;
  assistencia_social: RecordWithAlerts;
  revisado: boolean;
  revisado_por: string | null;
  revisado_em: string | null;
};

const seedPath = path.resolve(__dirname, "../../data/seed.json");
const seedRaw = readFileSync(seedPath, "utf-8");

const children: Child[] = JSON.parse(seedRaw);

export const getChildren = (): Child[] => children;
