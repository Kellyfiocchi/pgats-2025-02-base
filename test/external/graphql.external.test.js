const request = require("supertest");
const { expect } = require("chai");

const GQL_BASE = process.env.GRAPHQL_BASE_URL || "http://localhost:4000";
const GQL_PATH = process.env.GRAPHQL_PATH || "/graphql";
const KEY = process.env.API_KEY || "dev123";

const gql = (query, variables) => ({ query, variables });

describe("GraphQL external", () => {
  it("query { health } deve retornar ok:true", async () => {
    const res = await request(GQL_BASE)
      .post(GQL_PATH)
      .send(gql(`query { health { ok service } }`))
      .expect(200);

    expect(res.body.data.health.ok).to.equal(true);
  });

  it("CRUD de notas via GraphQL", async () => {
    const add = await request(GQL_BASE)
      .post(GQL_PATH)
      .set("x-api-key", KEY)
      .send(gql(`mutation { addNote(input:{title:"ext gql"}){ id title } }`))
      .expect(200);

    const id = add.body.data.addNote.id;
    expect(id).to.exist;

    const list = await request(GQL_BASE)
      .post(GQL_PATH)
      .set("x-api-key", KEY)
      .send(gql(`query { myNotes { id title } }`))
      .expect(200);
    expect(list.body.data.myNotes).to.be.an("array");

    const rm = await request(GQL_BASE)
      .post(GQL_PATH)
      .set("x-api-key", KEY)
      .send(gql(`mutation($id:ID!){ removeNote(id:$id) }`, { id }))
      .expect(200);

    expect(rm.body.data.removeNote).to.equal(true);
  });
});
