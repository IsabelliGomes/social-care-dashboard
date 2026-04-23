CREATE TABLE IF NOT EXISTS children (
  id                TEXT PRIMARY KEY,
  nome              TEXT NOT NULL,
  data_nascimento   TEXT NOT NULL,
  bairro            TEXT NOT NULL,
  responsavel       TEXT NOT NULL,
  saude             JSONB,
  educacao          JSONB,
  assistencia_social JSONB,
  revisado          BOOLEAN NOT NULL DEFAULT FALSE,
  revisado_por      TEXT,
  revisado_em       TIMESTAMPTZ
);
