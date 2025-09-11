const request = require("supertest");
const { expect } = require("chai");

const BASE = process.env.REST_BASE_URL || "http://localhost:3000";
const KEY = process.env.API_KEY || "dev123";

describe("REST external", () => {
  it("GET /health deve retornar ok:true", async () => {
    const res = await request(BASE).get("/health").expect(200);
    expect(res.body.ok).to.equal(true);
  });

  it("POST/GET/DELETE em /api/notes", async () => {
    const created = await request(BASE)
      .post("/api/notes")
      .set("x-api-key", KEY)
      .send({ title: "ext note", content: "hello" })
      .expect(201);

    const id = created.body.id;

    const list = await request(BASE)
      .get("/api/notes")
      .set("x-api-key", KEY)
      .expect(200);
    expect(list.body).to.be.an("array");

    await request(BASE)
      .delete(`/api/notes/${id}`)
      .set("x-api-key", KEY)
      .expect(204);
  });
});
