# Social Care Dashboard

Painel full-stack para acompanhamento de crianças em situação de vulnerabilidade social.

## Como rodar

### Com Docker (recomendado)

```bash
docker compose up
```

Isso sobe banco, backend e frontend **sem nenhuma configuração adicional**. Todas as variáveis de ambiente já estão declaradas no `docker-compose.yml`.

Na primeira execução o backend aplica o schema e popula o banco automaticamente via seed.

Se quiser reconstruir as imagens:

```bash
docker compose up --build
```

Depois de subir, acesse:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- Healthcheck: `http://localhost:3001/health`

### Localmente

#### Backend

```bash
cd backend
npm install
npm run dev
```

Variáveis esperadas em `backend/.env`:

```env
DATABASE_URL=postgres://app:postgres@localhost:5432/social_care
JWT_SECRET=change-me
PORT=3001
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Variável opcional:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Credenciais de teste

- E-mail: `tecnico@prefeitura.rio`
- Senha: `painel@2024`

O JWT emitido pelo backend inclui o campo `preferred_username` com o e-mail autenticado.

## Decisões arquiteturais e trade-offs

### Backend em Node.js + Express

**Decisão:** Express com TypeScript, sem ORM.  
**Trade-off:** mais controle sobre SQL e sem overhead de mapeamento, mas queries manuais exigem mais cuidado com segurança (SQL injection) — mitigado com queries parametrizadas via `pg`.

### PostgreSQL como persistência

**Decisão:** banco relacional real em vez de JSON em memória.  
**Trade-off:** aproxima o desafio de um cenário real, mas adiciona a necessidade do Docker para rodar localmente.

### Repository pattern

A camada de acesso a dados fica em `backend/src/repositories/children.repository.ts`, separando SQL da regra de negócio.  
**Trade-off:** mais arquivos, mas permite testar services com mocks sem tocar o banco.

### Services por domínio

Os services foram organizados em subpastas por domínio (`auth/`, `children/`, `summary/`), colocando testes ao lado do código que testam.  
**Trade-off:** estrutura mais verbosa que um único arquivo plano, porém mais fácil de escalar.

### Frontend por domínio

Os componentes foram agrupados em:

- `ui/` — componentes reutilizáveis
- `layout/` — navegação e shell
- `dashboard/` — tela inicial e gráficos
- `children/` — lista, detalhe e revisão
- `auth/` — login e landing page

**Trade-off:** mais diretórios, mas buscas e refatorações ficam isoladas por contexto.

### Barrel exports

Cada grupo expõe um `index.ts`:

```ts
import { Button } from "@/components/ui";
```

**Trade-off:** imports mais limpos, mas pode dificultar tree-shaking em bundles muito grandes (não é problema nessa escala).

### Armazenamento do token (localStorage)

**Decisão:** JWT em `localStorage` com validação de expiração no cliente.  
**Trade-off:** simples de implementar e suficiente para o desafio, mas vulnerável a XSS. Em produção migraria para cookie `httpOnly` + CSRF token.

## O que faria com mais tempo

- mover a filtragem de crianças para SQL no backend
- reforçar a proteção de rotas com `middleware.ts`
- melhorar acessibilidade de modais e tabelas
- adicionar E2E com Playwright
- publicar um deploy acessível
- incluir dark mode
- melhorar feedback visual em estados de erro e loading

## Testes

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

## Estrutura resumida

```text
backend/
frontend/
docker-compose.yml
```
