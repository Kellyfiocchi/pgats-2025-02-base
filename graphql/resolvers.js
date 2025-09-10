const users = require("../src/models/user");
const userService = require("../src/services/userService");
const checkoutService = require("../src/services/checkoutService");

// NOVO: modelo das Notes (sua API própria)
const {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../src/models/noteModel");

module.exports = {
  Query: {
    // já existente
    users: () => users,

    // NOVOS
    health: () => ({ ok: true, service: "graphql" }),
    myNotes: (_parent, _args, ctx) => {
      if (!ctx.apiKeyValid) throw new Error("unauthorized");
      return listNotes(ctx.apiKey);
    },
  },

  Mutation: {
    // já existentes
    register: (_, { name, email, password }) => {
      const user = userService.registerUser(name, email, password);
      if (!user) throw new Error("Email já cadastrado");
      return user;
    },

    login: (_, { email, password }) => {
      const result = userService.authenticate(email, password);
      if (!result) throw new Error("Credenciais inválidas");
      return result;
    },

    checkout: (_, { items, freight, paymentMethod, cardData }, context) => {
      const { userData } = context;
      if (!userData) throw new Error("Token inválido");
      const result = checkoutService.checkout(
        userData.id,
        items,
        freight,
        paymentMethod,
        cardData
      );
      return { ...result, valorFinal: result.total };
    },

    // NOVOS (Notes)
    addNote: (_parent, { input }, ctx) => {
      if (!ctx.apiKeyValid) throw new Error("unauthorized");
      if (!input?.title) throw new Error("title_required");
      return createNote(ctx.apiKey, input);
    },

    editNote: (_parent, { id, input }, ctx) => {
      if (!ctx.apiKeyValid) throw new Error("unauthorized");
      const updated = updateNote(ctx.apiKey, id, input || {});
      if (!updated) throw new Error("not_found");
      return updated;
    },

    removeNote: (_parent, { id }, ctx) => {
      if (!ctx.apiKeyValid) throw new Error("unauthorized");
      return deleteNote(ctx.apiKey, id);
    },
  },
};
