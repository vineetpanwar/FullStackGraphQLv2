const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }
  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    user: User
  }

  input petsInput {
    name: String
    type: String
  }

  input petInput {
    name: String
    id: ID
  }

  input newPet {
    name: String!
    type: String!
  }

  type Query {
    pets(input: petsInput): [Pet]!
    pet(input: petInput!): Pet!
  }

  type Mutation {
    pet(input: newPet!): Pet
  }
`;

module.exports = typeDefs
