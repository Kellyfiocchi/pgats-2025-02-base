const request = require("supertest");
const { expect } = require("chai");

const app = require("../../graphql/app");
const q = (s) => ({ query: s });

describe("GraphQL context (Bearer inválido)", () => {
  it("ignora userData quando token é inválido", async () => {
    // Apenas garante que o request com Bearer inválido não derruba o app
    const res = await request(app)
      .post("/graphql")
      .set("Authorization", "Bearer invalido.aqui")
      .send(q(`query { health { ok service } }`))
      .expect(200);

    expect(res.body.data.health.ok).to.equal(true);
  });
});
