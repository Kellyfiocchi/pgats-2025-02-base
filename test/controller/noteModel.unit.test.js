const { expect } = require("chai");
const {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../../src/models/noteModel");

describe("noteModel (unit)", () => {
  const key = "k1";

  it("create/list/update/delete fluxos e not found", () => {
    // começa vazio
    expect(listNotes(key)).to.be.an("array").with.length(0);

    // cria
    const n = createNote(key, { title: "t", content: "c" });
    expect(n).to.include.keys("id", "title", "content");

    // update valido
    const upd = updateNote(key, n.id, { title: "t2" });
    expect(upd.title).to.equal("t2");

    // update id inexistente
    const upd2 = updateNote(key, "9999", { title: "x" });
    expect(upd2).to.equal(null);

    // delete inexistente
    const del2 = deleteNote(key, "9999");
    expect(del2).to.equal(false);

    // delete valido
    const del = deleteNote(key, n.id);
    expect(del).to.equal(true);
  });
});
