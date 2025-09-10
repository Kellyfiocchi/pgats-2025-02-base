const request = require("supertest");
const { expect } = require("chai");

const GQL_BASE = process.env.GRAPHQL_BASE_URL || "http://localhost:4000";
const GQL_PATH = process.env.GRAPHQL_PATH || "/graphql";
const KEY = process.env.API_KEY || "dev123";

const q = (query, variables) => ({ query, variables });

describe("GraphQL external", () => {
  it("health query", async () => {
    const res = await request(GQL_BASE)
      .post(GQL_PATH)
      .send(q(`query { health { ok service } }`))
      .expect(200);

    expect(res.body.data.health.ok).to.equal(true);
  });

  it("notes mutations with x-api-key", async () => {
    // add
    const add = await request(GQL_BASE)
      .post(GQL_PATH)
      .set("x-api-key", KEY)
      .send(
        q(`mutation($t:String!){ addNote(input:{title:$t}){ id title } }`, {
          t: "ext gql",
        })
      )
      .expect(200);
    const id = add.body.data.addNote.id;
    expect(id).to.exist;

    // list
    const list = await request(GQL_BASE)
      .post(GQL_PATH)
      .set("x-api-key", KEY)
      .send(q(`query { myNotes { id title } }`))
      .expect(200);
    expect(list.body.data.myNotes).to.be.an("array");

    // remove
    const rm = await request(GQL_BASE)
      .post(GQL_PATH)
      .set("x-api-key", KEY)
      .send(q(`mutation($id:ID!){ removeNote(id:$id) }`, { id }))
      .expect(200);
    expect(rm.body.data.removeNote).to.equal(true);
  });
});
