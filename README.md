# Trabalho de Conclusão — Automação de Testes na Camada de Serviço (API)

Este projeto foi desenvolvido como parte da **Pós-graduação em Automação de Testes de Software**, no módulo **Automação de Testes na Camada de Serviço (API)**.

O objetivo foi construir e testar serviços em **REST** e **GraphQL**, aplicando conceitos de autenticação, documentação e automação de testes na pipeline de CI.

---

## 📌 Objetivos do Trabalho

- Construir uma **API própria** (Notes) em **REST** e **GraphQL**.
- Implementar autenticação via **API-Key** (header `x-api-key`) e **JWT** (para usuários).
- Garantir documentação com **Swagger** (REST).
- Criar e automatizar **testes**:
  - **Controller tests** (sem subir servidor).
  - **External tests** (servidor real, via URL).
- Configurar **pipeline CI/CD** com GitHub Actions.
- Atingir métricas de **cobertura** (≥ 60% linhas/funções).

---

## 🛠️ Tecnologias Utilizadas

- **Node.js / Express** → APIs REST
- **Apollo Server (GraphQL)** → APIs GraphQL
- **JWT (jsonwebtoken)** → autenticação de usuários
- **Swagger UI** → documentação dos endpoints REST
- **Mocha, Chai, Supertest** → testes automatizados
- **NYC (Istanbul)** → cobertura de código
- **start-server-and-test** → testes external na pipeline
- **GitHub Actions** → CI/CD

---

## 📂 Estrutura do Projeto

```text
📦 pgats-2025-02-base
├─ 📂 .github
│  └─ 📂 workflows
│     └─ nodejs.yml                 # Pipeline CI (tests + upload de cobertura)
│
├─ 📂 coverage/                      # Relatórios NYC (gerado pelos controller tests)
│  ├─ lcov-report/                   # HTML da cobertura
│  └─ lcov.info                      # LCOV (usado no upload do CI)
│
├─ 📂 graphql/                       # API GraphQL (Apollo Server)
│  ├─ app.js                         # Monta ApolloServer + context (auth)
│  ├─ resolvers.js                   # Implementação de queries/mutations
│  ├─ schema.js                      # SDL: tipos, queries e mutations
│  └─ server.js                      # Sobe servidor GraphQL (porta 4000)
│
├─ 📂 rest/                          # API REST (Express)
│  ├─ 📂 controllers
│  │  ├─ checkoutController.js       # Checkout (exemplo)
│  │  ├─ notes.controller.js         # CRUD de notas
│  │  └─ userController.js           # Login/registro (exemplo)
│  ├─ 📂 routes
│  │  ├─ checkoutRoutes.js           # Rotas /api/checkout
│  │  ├─ notes.routes.js             # Rotas /api/notes (x-api-key)
│  │  └─ userRoutes.js               # Rotas /api/users
│  ├─ app.js                         # App Express (middlewares/rotas/swagger)
│  ├─ server.js                      # Sobe servidor REST (porta 3000)
│  └─ swagger.js                     # Config do Swagger UI (/api-docs)
│
├─ 📂 src/
│  ├─ 📂 models                      # Camada de dados (in-memory)
│  │  ├─ noteModel.js
│  │  ├─ product.js
│  │  └─ user.js
│  └─ 📂 services                    # Regras de negócio / helpers
│     ├─ apiKeyAuth.js               # Middleware x-api-key
│     ├─ checkoutService.js
│     └─ userService.js              # JWT, login/registro
│
├─ 📂 test/
│  ├─ 📂 controller                  # Tests sem subir servidor (com NYC)
│  │  ├─ graphql.context.controller.test.js
│  │  ├─ graphql.health.controller.test.js
│  │  ├─ noteModel.unit.test.js
│  │  ├─ notes.gql.controller.test.js
│  │  ├─ notes.gql.errors.controller.test.js
│  │  ├─ notes.rest.controller.test.js
│  │  ├─ notes.rest.errors.controller.test.js
│  │  ├─ rest.health.controller.test.js
│  │  └─ userService.unit.test.js
│  └─ 📂 external                    # Tests E2E via HTTP (sem NYC)
│     ├─ graphql.external.test.js
│     ├─ notes.external.test.js
│     └─ rest.external.test.js
│
├─ .env                              # Variáveis locais (ex.: API_KEY=dev123)
├─ .nycrc                            # Config do NYC (limiares/paths)
├─ package.json                      # Scripts e dependências
├─ package-lock.json
└─ README.md
```

## 🔑 Funcionalidades Principais

### API REST

- `GET /health` → status do serviço.
- `POST /api/notes` → cria nota (**x-api-key obrigatório**).
- `GET /api/notes` → lista notas.
- `PATCH /api/notes/:id` → edita nota.
- `DELETE /api/notes/:id` → remove nota.

### API GraphQL

- `query { health }` → status.
- `query { myNotes }` → lista notas (**x-api-key**).
- `mutation { addNote, editNote, removeNote }`.
- `mutation { register, login, checkout }` → fluxo de usuários e compras (**JWT**).

---

## ✅ Testes Automatizados

### Controller Tests

Simulam requests no **app** sem subir servidor.  
**Exemplos**:

- Health REST/GraphQL.
- CRUD de Notes (sucesso e erros).
- Unit de `noteModel` e `userService`.

### External Tests

Sobem **REST/GraphQL** em portas reais (`3000/4000`) e testam via URL.

---

## 📊 Cobertura

Configuração em `package.json` (**nyc**):

- Linhas ≥ **60%**
- Funções ≥ **60%**
- Branches ≥ **50%**
- Statements ≥ **60%**

Relatórios em **texto** e **LCOV** (para integração com SonarQube ou cobertura no CI).

---

## ⚙️ Pipeline (CI/CD)

Workflow no **GitHub Actions** (`.github/workflows/ci.yml`):

1. Instala dependências.
2. Roda testes controller (`npm run test:controller`).
3. Sobe REST + GraphQL com **start-server-and-test**.
4. Executa external tests (`npm run test:external`).
5. Publica relatório de cobertura.

## ⚙️ Pipeline (CI/CD)

Workflow no **GitHub Actions** (`.github/workflows/ci.yml`):

1. Instala dependências.
2. Roda testes controller (`npm run test:controller`).
3. Sobe REST + GraphQL com **start-server-and-test**.
4. Executa external tests (`npm run test:external`).
5. Publica relatório de cobertura.

## 🚀 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Kellyfiocchi/pgats-2025-02-base
   cd pgats-2025-02-base
   ```
2. **Instale dependências:**

```bash
npm install
```

3. **Configure .env:**

```bash
API_KEY=dev123
```

4. **Suba o REST:**

```bash
npm run rest:serve
```

5. **Suba o GraphQL:**

```bash
npm run graphql:serve
```

6. **Rode os testes:**

```bash
npm test
```

6. **Teste rápido (cURL):**

```bash
# cria
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "x-api-key: dev123" \
  -d '{"title":"Primeira nota","content":"olá"}'

# lista
curl -H "x-api-key: dev123" http://localhost:3000/api/notes
```

7. **Scripts úteis (NPM)**

```bash
# REST e GraphQL (local)
npm run rest:serve
npm run graphql:serve

# Testes (cobertura só nos controller tests)
npm run test:controller
npm run ci:external     # sobe servidores e roda external tests
npm test                # controller + external, com upload do LCOV no CI
```

## 🎓 Conclusão

Este trabalho consolidou os aprendizados do módulo Automação de Testes na Camada de Serviço (API) da Pós-graduação em Automação de Testes de Software.
Aplicamos, na prática, a construção de APIs REST e GraphQL, autenticação com API-Key e JWT, documentação com Swagger, testes automatizados com Mocha/Chai/Supertest, além de integração contínua no GitHub Actions com métricas de cobertura.
