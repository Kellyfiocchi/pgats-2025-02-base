const request = require("supertest");
const { expect } = require("chai");

process.env.API_KEY = process.env.API_KEY || "dev123";
const app = require("../../graphql/app");

const q = (query, variables) => ({ query, variables });

describe("Notes GraphQL (erros)", () => {
  const key = process.env.API_KEY;

  it("addNote sem title -> erro de validação GraphQL (400)", async () => {
    const res = await request(app)
      .post("/graphql")
      .set("x-api-key", key)
      .send(q(`mutation { addNote(input:{ content:"oi" }) { id } }`))
      .expect(400); // <- Apollo manda 400 para erro de validação

    expect(res.body).to.have.property("errors");
    const msg = res.body.errors?.[0]?.message || "";
    // mensagem varia, então validamos genericamente
    expect(msg.toLowerCase()).to.satisfy(
      (m) =>
        m.includes("title") || m.includes("required") || m.includes("provided")
    );
  });

  it("editNote inexistente -> not_found", async () => {
    const res = await request(app)
      .post("/graphql")
      .set("x-api-key", key)
      .send(q(`mutation { editNote(id:"9999", input:{ title:"x" }) { id } }`))
      .expect(200);

    expect(res.body.errors?.[0]?.message).to.equal("not_found");
  });
});
