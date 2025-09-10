const request = require("supertest");
const { expect } = require("chai");

// garanta a API_KEY antes de importar o app
process.env.API_KEY = process.env.API_KEY || "dev123";

const app = require("../../rest/app");

describe("Notes REST (controller)", () => {
  const key = process.env.API_KEY;

  it("401 quando falta x-api-key", async () => {
    await request(app).get("/api/notes").expect(401);
  });

  it("cria, lista, edita e remove nota", async () => {
    // cria
    const created = await request(app)
      .post("/api/notes")
      .set("x-api-key", key)
      .send({ title: "minha nota", content: "oi" })
      .expect(201);

    expect(created.body).to.include.keys("id", "title", "content");

    const id = created.body.id;

    // lista
    const list = await request(app)
      .get("/api/notes")
      .set("x-api-key", key)
      .expect(200);

    expect(list.body).to.be.an("array").with.length.greaterThan(0);

    // edita
    const edited = await request(app)
      .patch(`/api/notes/${id}`)
      .set("x-api-key", key)
      .send({ title: "editada" })
      .expect(200);

    expect(edited.body.title).to.equal("editada");

    // remove
    await request(app)
      .delete(`/api/notes/${id}`)
      .set("x-api-key", key)
      .expect(204);
  });
});
