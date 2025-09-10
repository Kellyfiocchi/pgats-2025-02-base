// test/external/graphql.external.test.js
const request = require("supertest");
const { expect } = require("chai");

const GQL_BASE = process.env.GRAPHQL_BASE_URL || "http://localhost:4000";
const GQL_PATH = process.env.GRAPHQL_PATH || "/graphql";

describe("GraphQL external", () => {
  it("query { health } deve responder ok:true", async () => {
    const res = await request(GQL_BASE)
      .post(GQL_PATH)
      .send({ query: "query { health { ok service } }" })
      .expect(200);

    expect(res.body.data.health.ok).to.equal(true);
  });
});
