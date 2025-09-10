const request = require("supertest");
const { expect } = require("chai");

// garante API_KEY no contexto GraphQL
process.env.API_KEY = process.env.API_KEY || "dev123";

const app = require("../../graphql/app");

const q = (query, variables) => ({ query, variables });

describe("Notes GraphQL (controller)", () => {
  const key = process.env.API_KEY;

  it("health funciona", async () => {
    const res = await request(app)
      .post("/graphql")
      .send(q(`query { health { ok service } }`))
      .expect(200);

    expect(res.body.data.health.ok).to.equal(true);
  });

  it("bloqueia myNotes sem x-api-key", async () => {
    const res = await request(app)
      .post("/graphql")
      .send(q(`query { myNotes { id title } }`))
      .expect(200);

    // GraphQL retorna 200 com "errors"
    expect(res.body.errors?.[0]?.message).to.equal("unauthorized");
  });

  it("addNote, myNotes, editNote e removeNote com x-api-key", async () => {
    // addNote
    const add = await request(app)
      .post("/graphql")
      .set("x-api-key", key)
      .send(
        q(
          `mutation($t:String!,$c:String){ addNote(input:{title:$t, content:$c}) { id title content } }`,
          { t: "GQL nota", c: "hello" }
        )
      )
      .expect(200);

    const note = add.body.data.addNote;
    expect(note.title).to.equal("GQL nota");

    // myNotes
    const list = await request(app)
      .post("/graphql")
      .set("x-api-key", key)
      .send(q(`query { myNotes { id title } }`))
      .expect(200);

    expect(list.body.data.myNotes.length).to.be.greaterThan(0);

    // editNote
    const edited = await request(app)
      .post("/graphql")
      .set("x-api-key", key)
      .send(
        q(
          `mutation($id:ID!){ editNote(id:$id, input:{ title:"editada" }) { id title } }`,
          { id: note.id }
        )
      )
      .expect(200);

    expect(edited.body.data.editNote.title).to.equal("editada");

    // removeNote
    const removed = await request(app)
      .post("/graphql")
      .set("x-api-key", key)
      .send(q(`mutation($id:ID!){ removeNote(id:$id) }`, { id: note.id }))
      .expect(200);

    expect(removed.body.data.removeNote).to.equal(true);
  });
});
