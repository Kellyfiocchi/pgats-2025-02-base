// graphql/app.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const userService = require("../src/services/userService");
require("dotenv").config(); // lê API_KEY do .env

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // --- JWT (já existente) ---
    const auth = req.headers.authorization || "";
    let userData = null;
    if (auth.startsWith("Bearer ")) {
      const token = auth.slice(7);
      userData = userService.verifyToken(token);
    }

    // --- API-Key (para sua API Notes) ---
    const expected = process.env.API_KEY || "";
    const provided = req.headers["x-api-key"];
    const apiKeyValid = !!expected && provided === expected;

    return { userData, apiKey: provided, apiKeyValid };
  },
});

async function startApollo() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}

// opcional, útil para testes External
app.get("/health", (_req, res) => res.json({ ok: true, service: "graphql" }));

startApollo();

module.exports = app;
