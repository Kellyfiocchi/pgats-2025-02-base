const request = require("supertest");
const { expect } = require("chai");

process.env.API_KEY = process.env.API_KEY || "dev123";
const app = require("../../rest/app");

describe("Notes REST (erros)", () => {
  const key = process.env.API_KEY;

  it("400 quando criar sem title", async () => {
    const res = await request(app)
      .post("/api/notes")
      .set("x-api-key", key)
      .send({ content: "sem título" })
      .expect(400);

    expect(res.body).to.have.property("error", "title_required");
  });

  it("404 quando editar/deletar id inexistente", async () => {
    await request(app)
      .patch("/api/notes/9999")
      .set("x-api-key", key)
      .send({ title: "x" })
      .expect(404);

    await request(app)
      .delete("/api/notes/9999")
      .set("x-api-key", key)
      .expect(404);
  });
});
