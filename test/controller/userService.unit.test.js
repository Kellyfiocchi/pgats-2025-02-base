// test/controller/userService.unit.test.js
const { expect } = require("chai");
const userService = require("../../src/services/userService");

describe("userService (unit)", () => {
  it("register/login + erros", () => {
    const u = userService.registerUser("a", "a@a.com", "123");
    expect(u.email).to.equal("a@a.com");
    expect(userService.registerUser("b", "a@a.com", "123")).to.equal(null); // duplicado
    expect(userService.authenticate("a@a.com", "123").token).to.be.a("string");
    expect(userService.authenticate("a@a.com", "errada")).to.equal(null);
  });
});
