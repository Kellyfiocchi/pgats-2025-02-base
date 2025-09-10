// test/external/rest.external.test.js
const request = require("supertest");
const { expect } = require("chai");

const BASE = process.env.REST_BASE_URL || "http://localhost:3000";
const KEY = process.env.API_KEY || "dev123";

describe("REST external", () => {
  it("GET /health deve responder ok:true", async () => {
    const res = await request(BASE).get("/health").expect(200);
    expect(res.body).to.have.property("ok", true);
  });
});
