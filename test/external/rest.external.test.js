const request = require("supertest");
const { expect } = require("chai");

const BASE = process.env.REST_BASE_URL || "http://localhost:3000";
const KEY = process.env.API_KEY || "dev123";

describe("REST external", () => {
  it("GET /health => 200 ok", async () => {
    const res = await request(BASE).get("/health").expect(200);
    expect(res.body).to.have.property("ok", true);
  });

  it("Notes flow via HTTP", async () => {
    // create
    const created = await request(BASE)
      .post("/api/notes")
      .set("x-api-key", KEY)
      .send({ title: "ext note", content: "hello" })
      .expect(201);

    const id = created.body.id;
    expect(id).to.exist;

    // list
    const list = await request(BASE)
      .get("/api/notes")
      .set("x-api-key", KEY)
      .expect(200);
    expect(list.body).to.be.an("array");

    // delete
    await request(BASE)
      .delete(`/api/notes/${id}`)
      .set("x-api-key", KEY)
      .expect(204);
  });
});
