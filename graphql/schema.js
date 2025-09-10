// graphql/schema.js
const { gql } = require("apollo-server-express");

module.exports = gql`
  """
  Tipos já existentes
  """
  type User {
    name: String!
    email: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type CheckoutResult {
    userId: ID!
    valorFinal: Float!
    paymentMethod: String!
    freight: Float!
    items: [CheckoutItem!]!
  }

  type CheckoutItem {
    productId: Int!
    quantity: Int!
  }

  input CheckoutItemInput {
    productId: Int!
    quantity: Int!
  }

  input CardDataInput {
    number: String!
    name: String!
    expiry: String!
    cvv: String!
  }

  """
  Novos tipos para health e Notes
  """
  type Health {
    ok: Boolean!
    service: String!
  }

  type Note {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  input NoteInput {
    title: String!
    content: String
  }

  input NoteEditInput {
    title: String
    content: String
  }

  """
  Queries
  """
  type Query {
    # já existente
    users: [User!]!

    # novos
    health: Health!
    myNotes: [Note!]!
  }

  """
  Mutations
  """
  type Mutation {
    # já existentes
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    checkout(
      items: [CheckoutItemInput!]!
      freight: Float!
      paymentMethod: String!
      cardData: CardDataInput
    ): CheckoutResult!

    # novas (Notes)
    addNote(input: NoteInput!): Note!
    editNote(id: ID!, input: NoteEditInput!): Note!
    removeNote(id: ID!): Boolean!
  }
`;
