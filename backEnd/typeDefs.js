const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
 
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
  }
  type Token {
    name: String!
    email: String!
    token: String!
  }
  
  input SignUpInput {
    email: String!
    name: String!
    password: String!
  }
  
  input SignInInput {
    email: String!
    password: String!
  }
  
 input GetUserInput{
  email: String!
 }
 
  type Query {
    hello: String!
    user: [User!]!
    getUser(input: GetUserInput!):Token!
  }

  type Mutation {
    signup(input: SignUpInput!): Token!
    signin(input: SignInInput!): User!
  }
`;
