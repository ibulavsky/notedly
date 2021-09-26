// index.js
// This is the main entry point of our application

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const db = require("./db");
const models = require("./models");

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

//Построение схемы GraphQL
const typeDefs = gql`
  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  
  type Mutation {
    newNote(content: String!): Note!
  }
`;

//Распознаватель
const resolvers = {
  Query: {
    hello: () => `Hello world!`,
    notes: async () => {
      return await models.Note.find();
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Igor Bulavsky'
      });
    }
  }
};

const app = express();

//Connect DB
db.connect(DB_HOST);

//ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/api" });
app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);