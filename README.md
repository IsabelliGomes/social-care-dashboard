# Social Care Dashboard

Painel full-stack desenvolvido para apoiar técnicos de campo no acompanhamento de crianças em situação de vulnerabilidade social.

A aplicação centraliza indicadores de **saúde, educação e assistência social**, permitindo identificar alertas ativos, consultar casos rapidamente e registrar revisões realizadas em campo.

Projetado com foco em **usabilidade, performance e responsividade**, considerando acesso frequente por celular e computadores simples.

## Requisitos atendidos

✅ Login com JWT e proteção de rotas  
✅ Dashboard com indicadores agregados  
✅ Lista com filtros e paginação  
✅ Tela de detalhe da criança  
✅ Marcar caso como revisado  
✅ Dados parciais tratados na interface  
✅ Layout responsivo (mobile → desktop)  
✅ Docker Compose sobe tudo do zero  
✅ Tema claro/escuro  
✅ Testes unitários (backend e frontend)

## Stack

| Camada   | Tecnologias |
|----------|-------------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Backend  | Node.js, Express, TypeScript, PostgreSQL, JWT |
| Testes   | Jest |
| Infra    | Docker + Docker Compose |

Para desenvolvimento local alinhado às imagens Docker, use **Node.js 22+** e **npm**.

## Como rodar

### Com Docker local

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

É necessário um PostgreSQL acessível (por exemplo o do seu `docker compose up db`).

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

Opcional: `CORS_ORIGIN` (padrão `http://localhost:3000`).

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

## API (resumo)

Rotas expostas na raiz do servidor:

- `POST /auth/token` — autenticação e JWT (JSON `{ "email", "password" }`)
- `GET /children`, `GET /children/:id`, `PATCH /children/:id/review` — listagem, detalhe e revisão de status (rotas protegidas por Bearer token)
- `GET /summary` — agregados para o dashboard (protegida)
- `GET /health` — disponibilidade do serviço

## Credenciais de teste

- E-mail: `tecnico@prefeitura.rio`
- Senha: `painel@2024`

O JWT emitido pelo backend inclui o campo `preferred_username` com o e-mail autenticado.

## Decisões arquiteturais e trade-offs

### Backend em Node.js + Express + TypeScript

**Decisão:** escolhi Node.js com Express e TypeScript pela velocidade de desenvolvimento, ecossistema maduro e excelente aderência a APIs REST.

**Trade-off:** frameworks mais opinados poderiam reduzir código boilerplate, porém Express ofereceu flexibilidade total para estruturar o projeto e entregar rapidamente.

---

### PostgreSQL como persistência

**Decisão:** utilizei PostgreSQL em vez de manter os dados em memória ou em arquivos JSON.

**Trade-off:** aumenta a complexidade inicial da infraestrutura, mas aproxima a solução de um ambiente real, permite consultas relacionais, paginação eficiente e persistência confiável.

---

### SQL direto via `pg` (sem ORM)

**Decisão:** optei por queries SQL parametrizadas usando `pg`, sem ORM.

**Trade-off:** exige maior cuidado manual nas queries e modelagem, porém evita abstrações desnecessárias e oferece controle total sobre performance e estrutura dos dados.

---

### Separação em camadas (routes → controllers → services → repositories)

**Decisão:** organizei o backend em responsabilidades claras:
- rotas recebem requests
- controllers tratam HTTP
- services concentram regras de negócio
- repositories acessam dados

**Trade-off:** adiciona mais arquivos e estrutura inicial, porém melhora manutenção, testes e escalabilidade do código.

---

### Organização frontend por domínio

**Decisão:** os componentes foram agrupados por contexto funcional (`auth`, `dashboard`, `children`, `layout`, `ui`).

**Trade-off:** exige mais disciplina estrutural, porém reduz acoplamento e facilita evolução de cada área da aplicação de forma independente.

---

### Autenticação baseada em JWT

**Decisão:** JWT stateless para autenticação entre frontend e backend.

**Trade-off:** simplifica integração e escalabilidade horizontal, porém exige cuidado extra com expiração, logout e armazenamento seguro do token.

---

### Gerenciamento de segredos no ambiente local

**Decisão:** para permitir que o projeto seja executado imediatamente com `docker compose up`, as variáveis necessárias para o desafio (incluindo `JWT_SECRET`) foram declaradas diretamente no ambiente local do Docker Compose.

**Trade-off:** simplifica a avaliação e elimina etapas extras de configuração, porém não é a abordagem recomendada para produção.

Na versão publicada, segredos sensíveis ficam externalizados em variáveis de ambiente gerenciadas pela plataforma de hospedagem, sem exposição no repositório ou em arquivos versionados.

---

### Armazenamento do token no frontend

**Decisão:** para o escopo do desafio, o JWT foi armazenado no `localStorage`, com verificação de expiração no cliente e redirecionamento automático para login quando necessário.

**Trade-off:** solução simples e rápida de implementar, adequada para o desafio, porém menos robusta para aplicações reais.

Em produção, priorizaria mecanismos mais seguros de sessão, com token armazenado no servidor ou em cookies protegidos.

## Pontos de evolução

### Produto / UX
- Busca textual por nome da criança ou responsável
- Ordenação por nome, idade ou data da última revisão
- Histórico de revisões realizadas, com data e técnico responsável
- Exportação CSV da listagem para uso operacional
- Cadastro e gestão de técnicos pela própria interface

### Engenharia
- Middleware de autenticação no frontend via Next.js Middleware
- Testes E2E com Playwright cobrindo fluxos críticos
- Observabilidade com logs estruturados, métricas e alertas
- Rate limiting e hardening de segurança nos endpoints
- Controle de perfis e permissões (RBAC) para múltiplos técnicos

### Escalabilidade
- Filtros, busca e paginação processados integralmente no banco
- Índices otimizados para consultas frequentes
- Cache para endpoint `/summary`
- Processamento assíncrono para cargas e sincronizações futuras

As evoluções priorizadas dependeriam do contexto real de uso, volume de acessos e feedback dos técnicos em campo.

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
social-care-dashboard/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── controllers/
│   │   ├── db/          # schema, seed, client
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   └── services/
│   └── Dockerfile
├── frontend/
│   ├── app/             # rotas Next.js (App Router)
│   ├── components/
│   └── lib/
└── docker-compose.yml
```
