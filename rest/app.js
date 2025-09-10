// rest/app.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const userRoutes = require("./routes/userRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const notesRoutes = require("./routes/notes.routes"); // << sua rota nova

const app = express();
app.use(express.json());

// Rotas da base do professor
app.use("/api/users", userRoutes);
app.use("/api/checkout", checkoutRoutes);

// SUA API própria (Notes) — protegida pelo middleware dentro do notes.routes
app.use("/api/notes", notesRoutes);

// Healthcheck simples (útil pros testes External)
app.get("/health", (_req, res) =>
  res.status(200).json({ ok: true, service: "rest" })
);

// Swagger (já existente)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// (Opcional) 404 padrão para rotas inexistentes, ajuda nos testes
app.use((req, res) => res.status(404).json({ error: "not_found" }));

module.exports = app;
